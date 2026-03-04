import { useState, useMemo, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Search, MapPin, Navigation, Car, User, Phone } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Booking, geocodeLocation, updateBooking } from "@/store/slices/bookingSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const containerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "500px",
};

const defaultCenter = {
    lat: 37.7749, // San Francisco
    lng: -122.4194
};

export function MapTracking() {
    const dispatch = useAppDispatch();
    const { bookings } = useAppSelector((state) => state.booking);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    // Geocode bookings that don't have lat/lng client-side on-the-fly
    useEffect(() => {
        const geocodeMissing = async () => {
            for (const b of bookings) {
                if (!b.booking_lat || !b.booking_lng) {
                    if (b.pickup_location) {
                        try {
                            const coords = await geocodeLocation(b.pickup_location);
                            if (coords) {
                                // Dispatch an update to save the coords back to the db/store
                                dispatch(updateBooking({ id: b.id, updates: { booking_lat: coords.lat, booking_lng: coords.lng } }));
                            }
                        } catch (e) {
                            console.error("Failed to geocode", b.pickup_location);
                        }
                    }
                }
            }
        };

        if (isLoaded) {
            geocodeMissing();
        }
    }, [bookings, isLoaded, dispatch]);

    const filteredBookings = useMemo(() => {
        if (!searchQuery) return bookings;
        const q = searchQuery.toLowerCase();
        return bookings.filter(b =>
            b.guest_name.toLowerCase().includes(q) ||
            b.car_name.toLowerCase().includes(q) ||
            b.pickup_location.toLowerCase().includes(q)
        );
    }, [bookings, searchQuery]);

    // Auto fit bounds
    useEffect(() => {
        if (mapRef.current && filteredBookings.length > 0 && window.google) {
            const bounds = new window.google.maps.LatLngBounds();
            let hasValidCoords = false;
            filteredBookings.forEach(b => {
                if (b.booking_lat && b.booking_lng) {
                    bounds.extend({ lat: b.booking_lat, lng: b.booking_lng });
                    hasValidCoords = true;
                }
            });
            if (hasValidCoords) {
                mapRef.current.fitBounds(bounds);
                // Don't zoom in too close for a single marker
                const listener = window.google.maps.event.addListener(mapRef.current, 'idle', () => {
                    const zoom = mapRef.current?.getZoom();
                    if (zoom && zoom > 14) mapRef.current?.setZoom(14);
                    window.google.maps.event.removeListener(listener);
                });
            }
        }
    }, [filteredBookings]);

    const getMarkerIcon = (status: string) => {
        let color = "#EAB308"; // pending (yellow)
        if (status === "confirmed") color = "#22C55E"; // green
        if (status === "completed") color = "#3B82F6"; // blue
        if (status === "cancelled") color = "#111827"; // black

        return {
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: color,
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 1.5,
            anchor: isLoaded ? new window.google.maps.Point(12, 24) : undefined,
        };
    };

    if (loadError) return <div className="p-6 text-red-500">Error loading maps.</div>;

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "confirmed": return "default";
            case "pending": return "secondary";
            case "completed": return "outline";
            default: return "outline";
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-6">
                <div>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Navigation className="h-5 w-5 text-muted-foreground" />
                        Live Map Tracking
                    </CardTitle>
                </div>
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search guest, car, or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-10"
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="relative border rounded-xl overflow-hidden min-h-[500px] bg-muted/20">
                    {!isLoaded ? (
                        <div className="p-4 space-y-4">
                            <Skeleton className="h-[460px] w-full" />
                        </div>
                    ) : (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={defaultCenter}
                            zoom={5}
                            onLoad={map => { mapRef.current = map; }}
                            onClick={() => setSelectedBooking(null)}
                            options={{
                                disableDefaultUI: false,
                                zoomControl: true,
                                mapTypeControl: false,
                                scaleControl: true,
                                streetViewControl: false,
                                rotateControl: false,
                                fullscreenControl: true,
                                styles: [
                                    {
                                        featureType: "poi",
                                        elementType: "labels",
                                        stylers: [{ visibility: "off" }]
                                    }
                                ]
                            }}
                        >
                            {filteredBookings.map(b => {
                                if (!b.booking_lat || !b.booking_lng) return null;
                                return (
                                    <Marker
                                        key={b.id}
                                        position={{ lat: b.booking_lat, lng: b.booking_lng }}
                                        icon={getMarkerIcon(b.status)}
                                        onClick={() => setSelectedBooking(b)}
                                    />
                                );
                            })}

                            {selectedBooking && selectedBooking.booking_lat && selectedBooking.booking_lng && (
                                <InfoWindow
                                    position={{ lat: selectedBooking.booking_lat, lng: selectedBooking.booking_lng }}
                                    onCloseClick={() => setSelectedBooking(null)}
                                >
                                    <div className="p-2 min-w-[180px]">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant={getStatusVariant(selectedBooking.status) as any} className="text-[10px] uppercase font-bold px-1.5 py-0 h-4">
                                                {selectedBooking.status}
                                            </Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Car className="h-3.5 w-3.5 text-muted-foreground" />
                                                <h3 className="font-bold text-sm tracking-tight">{selectedBooking.car_name}</h3>
                                            </div>
                                            <div className="flex items-center gap-2 pl-0.5">
                                                <User className="h-3 w-3 text-muted-foreground" />
                                                <p className="text-xs font-medium">{selectedBooking.guest_name}</p>
                                            </div>
                                            <div className="flex items-center gap-2 pl-0.5">
                                                <Phone className="h-3 w-3 text-muted-foreground" />
                                                <p className="text-[10px] text-muted-foreground">{selectedBooking.guest_phone}</p>
                                            </div>
                                            <div className="mt-3 pt-2 border-t border-dashed space-y-1">
                                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                                    <MapPin className="h-3 w-3" />
                                                    Range
                                                </div>
                                                <p className="text-[11px] font-semibold">
                                                    {new Date(selectedBooking.pickup_date).toLocaleDateString()} - {new Date(selectedBooking.return_date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    )}
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-[11px] uppercase tracking-widest font-bold text-muted-foreground/60">
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm" /> Pending</div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm" /> Confirmed</div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" /> Completed</div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-gray-900 shadow-sm" /> Cancelled</div>
                </div>
            </CardContent>
        </Card>
    );
}
