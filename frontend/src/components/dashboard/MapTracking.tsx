"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Search, MapPin, Navigation, Car, User, Phone } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Booking, geocodeLocation, updateBooking } from "@/store/slices/bookingSlice";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Chip,
    Skeleton,
    Divider
} from "@heroui/react";

const containerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "500px",
};

const defaultCenter = {
    lat: 37.7749,
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

    useEffect(() => {
        const geocodeMissing = async () => {
            for (const b of bookings) {
                if (!b.booking_lat || !b.booking_lng) {
                    if (b.pickup_location) {
                        try {
                            const coords = await geocodeLocation(b.pickup_location);
                            if (coords) {
                                dispatch(updateBooking({ id: b.id, updates: { booking_lat: coords.lat, booking_lng: coords.lng } }));
                            }
                        } catch (e) {
                            console.error("Failed to geocode", b.pickup_location);
                        }
                    }
                }
            }
        };
        if (isLoaded) geocodeMissing();
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
                const listener = window.google.maps.event.addListener(mapRef.current, 'idle', () => {
                    const zoom = mapRef.current?.getZoom();
                    if (zoom && zoom > 14) mapRef.current?.setZoom(14);
                    window.google.maps.event.removeListener(listener);
                });
            }
        }
    }, [filteredBookings]);

    const getMarkerIcon = (status: string) => {
        let color = "#EAB308";
        if (status === "confirmed") color = "#22C55E";
        if (status === "completed") color = "#3B82F6";
        if (status === "cancelled") color = "#111827";
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

    const getStatusColor = (status: string): "default" | "primary" | "secondary" | "success" | "warning" | "danger" => {
        switch (status) {
            case "confirmed": return "success";
            case "pending": return "warning";
            case "completed": return "primary";
            case "cancelled": return "danger";
            default: return "default";
        }
    };

    if (loadError) return <div className="p-4 text-danger">Error loading maps.</div>;

    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                    <div className="flex items-center gap-2">
                        <Navigation className="size-5 text-primary" />
                        <p className="text-large font-bold">Live Tracking</p>
                    </div>
                    <p className="text-small text-default-500">Real-time location monitoring</p>
                </div>
                <Input
                    placeholder="Search guest, car, or location..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    startContent={<Search className="size-4 text-default-400" />}
                    size="sm"
                    className="max-w-xs"
                    variant="flat"
                />
            </CardHeader>
            <CardBody>
                <div className="relative rounded-xl overflow-hidden min-h-[500px] bg-default-100">
                    {!isLoaded ? (
                        <Skeleton className="h-[460px] w-full rounded-xl" />
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
                                streetViewControl: false,
                                rotateControl: false,
                                fullscreenControl: true,
                                styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }]
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
                                    <div className="p-1 min-w-[200px]">
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            color={getStatusColor(selectedBooking.status)}
                                            className="mb-2"
                                        >
                                            {selectedBooking.status}
                                        </Chip>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Car className="size-4 text-primary" />
                                                <span className="font-semibold text-sm">{selectedBooking.car_name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-default-600">
                                                <User className="size-3" />
                                                <span className="text-xs">{selectedBooking.guest_name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-default-500">
                                                <Phone className="size-3" />
                                                <span className="text-xs">{selectedBooking.guest_phone}</span>
                                            </div>
                                            <Divider />
                                            <div className="flex items-center gap-2 text-default-500">
                                                <MapPin className="size-3 text-danger" />
                                                <span className="text-xs">
                                                    {new Date(selectedBooking.pickup_date).toLocaleDateString()} - {new Date(selectedBooking.return_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    )}
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-tiny text-default-500">
                        <div className="w-2.5 h-2.5 rounded-full bg-warning" /> Pending
                    </div>
                    <div className="flex items-center gap-2 text-tiny text-default-500">
                        <div className="w-2.5 h-2.5 rounded-full bg-success" /> Confirmed
                    </div>
                    <div className="flex items-center gap-2 text-tiny text-default-500">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" /> Completed
                    </div>
                    <div className="flex items-center gap-2 text-tiny text-default-500">
                        <div className="w-2.5 h-2.5 rounded-full bg-foreground" /> Cancelled
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
