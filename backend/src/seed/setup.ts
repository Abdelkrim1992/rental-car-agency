import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "https://itsyagaubxhhefduylvw.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

const SCHEMA_SQL = `
-- ====== RUN THIS IN SUPABASE SQL EDITOR ======
-- Go to: https://supabase.com/dashboard/project/itsyagaubxhhefduylvw/sql/new

CREATE TABLE IF NOT EXISTS cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  price_per_day DECIMAL(10, 2) NOT NULL,
  fuel VARCHAR(50) NOT NULL,
  mileage VARCHAR(50),
  location VARCHAR(255),
  image_url TEXT,
  description TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name VARCHAR(255),
  phone VARCHAR(50),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  car_id UUID REFERENCES cars(id) ON DELETE CASCADE NOT NULL,
  pickup_date DATE NOT NULL,
  return_date DATE NOT NULL,
  pickup_location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  total_price DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  car_id UUID REFERENCES cars(id) ON DELETE CASCADE NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Cars are viewable by everyone" ON cars FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Cars insertable" ON cars FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Cars deletable" ON cars FOR DELETE USING (true);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Profiles viewable by user" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY IF NOT EXISTS "Profiles updatable by user" ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Bookings viewable by user" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Bookings insertable by user" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "Bookings updatable by user" ON bookings FOR UPDATE USING (auth.uid() = user_id);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Reviews viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Reviews insertable by user" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
`;

const SEED_DATA = [
  { name: "Porsche Taycan 4S", brand: "Porsche", type: "Sports Car", price_per_day: 10.89, fuel: "Electric", mileage: "18031", location: "New York", image_url: "/images/adebee23f7896499677e9a0c415c382a8aa85bd6.png", description: "The Porsche Taycan 4S combines electrifying performance with everyday usability.", available: true },
  { name: "Mustang GT 350", brand: "Ford", type: "Muscle Car", price_per_day: 10.99, fuel: "Petrol", mileage: "18031", location: "Miami", image_url: "/images/ee2f058676f5786a3c01fc324cd6782da010b3bc.png", description: "The Shelby GT350 is the ultimate driver's Mustang.", available: true },
  { name: "Ferrari 812 Superfast", brand: "Ferrari", type: "Supercar", price_per_day: 10.99, fuel: "Petrol", mileage: "18031", location: "Los Angeles", image_url: "/images/53806ca99b42af7169e4f4b4b1876e05cffb1b80.png", description: "The Ferrari 812 Superfast lives up to its name.", available: true },
  { name: "Bugatti Chiron Sport", brand: "Bugatti", type: "Hypercar", price_per_day: 12.99, fuel: "Petrol", mileage: "18031", location: "New York", image_url: "/images/b227dfaa10ab295e6582836281b6250997327b9a.png", description: "The Bugatti Chiron Sport is the pinnacle of automotive engineering.", available: true },
  { name: "Lamborghini Countach", brand: "Lamborghini", type: "Supercar", price_per_day: 11.49, fuel: "Petrol", mileage: "15200", location: "Miami", image_url: "/images/3bd3087fb3001d5362d5167baf4c8d6a0e29cb43.png", description: "The Lamborghini Countach LPI 800-4 is a modern tribute to the legendary original.", available: true },
  { name: "Porsche 918 SPYD", brand: "Porsche", type: "Hypercar", price_per_day: 13.99, fuel: "Hybrid", mileage: "12400", location: "Los Angeles", image_url: "/images/78a4b89df20fa1fbe30c4c405ba2e9d60efb6c99.png", description: "The Porsche 918 Spyder is a plug-in hybrid hypercar.", available: true },
];

async function setup() {
  console.log("🔧 Renture Database Setup");
  console.log("=".repeat(50));

  // Check if cars table exists
  console.log("\n📋 Checking if tables exist...");
  const { error: carsError } = await supabase.from("cars").select("id").limit(1);

  if (carsError && carsError.message.includes("does not exist")) {
    console.log("\n❌ Tables don't exist yet. You need to create them first.\n");
    console.log("╔" + "═".repeat(58) + "╗");
    console.log("║  PLEASE DO THE FOLLOWING:                                ║");
    console.log("╠" + "═".repeat(58) + "╣");
    console.log("║                                                          ║");
    console.log("║  1. Open this URL in your browser:                       ║");
    console.log("║                                                          ║");
    console.log("║  https://supabase.com/dashboard/project/                 ║");
    console.log("║  itsyagaubxhhefduylvw/sql/new                            ║");
    console.log("║                                                          ║");
    console.log("║  2. Copy ALL the SQL from this file:                     ║");
    console.log("║     backend/schema.sql                                   ║");
    console.log("║                                                          ║");
    console.log("║  3. Paste in the SQL Editor and click RUN                ║");
    console.log("║                                                          ║");
    console.log("║  4. Come back and run: npm run setup                     ║");
    console.log("║                                                          ║");
    console.log("╚" + "═".repeat(58) + "╝");
    console.log("\n📄 SQL is saved in: backend/schema.sql");
    console.log("🔗 Direct link: https://supabase.com/dashboard/project/itsyagaubxhhefduylvw/sql/new\n");
    process.exit(1);
  }

  if (carsError) {
    console.error("❌ Unexpected error:", carsError.message);
    process.exit(1);
  }

  console.log("✅ Cars table exists!");

  // Seed data
  console.log("\n🗑️  Clearing existing cars...");
  await supabase.from("cars").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  console.log("🌱 Seeding cars...");
  const { data: inserted, error: insertError } = await supabase
    .from("cars")
    .insert(SEED_DATA)
    .select();

  if (insertError) {
    console.error("❌ Seed error:", insertError.message);
    process.exit(1);
  }

  console.log(`\n✅ Successfully seeded ${inserted?.length || 0} cars:`);
  inserted?.forEach((car) => console.log(`   🚗 ${car.name}`));
  console.log("\n🎉 Setup complete! Your database is ready.");
}

setup();
