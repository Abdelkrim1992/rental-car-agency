import { supabaseAdmin } from "../config/supabase.js";
import dotenv from "dotenv";

dotenv.config();

const carsData = [
    { name: "Porsche Taycan 4S", brand: "Porsche", type: "Sports Car", price_per_day: 10.89, fuel: "Electric", mileage: "18031", location: "New York", image_url: "/images/adebee23f7896499677e9a0c415c382a8aa85bd6.png", description: "The Porsche Taycan 4S combines electrifying performance with everyday usability.", available: true },
    { name: "Mustang GT 350", brand: "Ford", type: "Muscle Car", price_per_day: 10.99, fuel: "Petrol", mileage: "18031", location: "Miami", image_url: "/images/ee2f058676f5786a3c01fc324cd6782da010b3bc.png", description: "The Shelby GT350 is the ultimate driver's Mustang.", available: true },
    { name: "Ferrari 812 Superfast", brand: "Ferrari", type: "Supercar", price_per_day: 10.99, fuel: "Petrol", mileage: "18031", location: "Los Angeles", image_url: "/images/53806ca99b42af7169e4f4b4b1876e05cffb1b80.png", description: "The Ferrari 812 Superfast lives up to its name.", available: true },
    { name: "Bugatti Chiron Sport", brand: "Bugatti", type: "Hypercar", price_per_day: 12.99, fuel: "Petrol", mileage: "18031", location: "New York", image_url: "/images/b227dfaa10ab295e6582836281b6250997327b9a.png", description: "The Bugatti Chiron Sport is the pinnacle of automotive engineering.", available: true },
    { name: "Lamborghini Countach", brand: "Lamborghini", type: "Supercar", price_per_day: 11.49, fuel: "Petrol", mileage: "15200", location: "Miami", image_url: "/images/3bd3087fb3001d5362d5167baf4c8d6a0e29cb43.png", description: "The Lamborghini Countach LPI 800-4 is a modern tribute to the legendary original.", available: true },
    { name: "Porsche 918 SPYD", brand: "Porsche", type: "Hypercar", price_per_day: 13.99, fuel: "Hybrid", mileage: "12400", location: "Los Angeles", image_url: "/images/78a4b89df20fa1fbe30c4c405ba2e9d60efb6c99.png", description: "The Porsche 918 Spyder is a plug-in hybrid hypercar.", available: true },
];

async function seed() {
    console.log("🌱 Seeding database...");

    // Clear existing cars
    const { error: deleteError } = await supabaseAdmin.from("cars").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (deleteError) {
        console.error("Error clearing cars:", deleteError.message);
    }

    // Insert cars
    const { data, error } = await supabaseAdmin.from("cars").insert(carsData).select();

    if (error) {
        console.error("Error seeding cars:", error.message);
        process.exit(1);
    }

    console.log(`✅ Seeded ${data.length} cars successfully!`);
    data.forEach((car) => console.log(`   - ${car.name} (${car.id})`));

    process.exit(0);
}

seed();
