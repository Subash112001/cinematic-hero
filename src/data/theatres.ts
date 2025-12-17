import { Theatre } from "@/types/theatre";

export const THEATRES: Theatre[] = [
    {
        id: "t1",
        name: "PVR: Nexus Mall, Koramangala",
        location: "Koramangala, Bangalore",
        distance: "1.2 km away",
        facilities: ["Dolby Atmos", "Recliner", "F&B"],
        showtimes: [
            { id: "s1", time: "10:30 AM", type: "2D", price: 250, available: true, totalSeats: 150, bookedSeats: 45 },
            { id: "s2", time: "01:15 PM", type: "IMAX", price: 550, available: true, totalSeats: 200, bookedSeats: 180 },
            { id: "s3", time: "04:45 PM", type: "2D", price: 280, available: true, totalSeats: 150, bookedSeats: 20 },
            { id: "s4", time: "08:30 PM", type: "IMAX", price: 600, available: false, totalSeats: 200, bookedSeats: 200 },
        ]
    },
    {
        id: "t2",
        name: "INOX: Garuda Mall",
        location: "Magrath Road, Bangalore",
        distance: "3.5 km away",
        facilities: ["Laser Projection", "Dolby 7.1"],
        showtimes: [
            { id: "s5", time: "11:00 AM", type: "2D", price: 220, available: true, totalSeats: 120, bookedSeats: 10 },
            { id: "s6", time: "02:30 PM", type: "3D", price: 350, available: true, totalSeats: 120, bookedSeats: 60 },
            { id: "s7", time: "06:00 PM", type: "2D", price: 250, available: true, totalSeats: 120, bookedSeats: 110 },
        ]
    },
    {
        id: "t3",
        name: "Cinepolis: Lulu Mall",
        location: "Rajajinagar, Bangalore",
        distance: "5.0 km away",
        facilities: ["IMAX", "4DX", "Gold Class"],
        showtimes: [
            { id: "s8", time: "09:45 AM", type: "4DX", price: 450, available: true, totalSeats: 80, bookedSeats: 15 },
            { id: "s9", time: "01:00 PM", type: "IMAX", price: 500, available: true, totalSeats: 250, bookedSeats: 100 },
            { id: "s10", time: "05:15 PM", type: "IMAX", price: 550, available: true, totalSeats: 250, bookedSeats: 240 },
            { id: "s11", time: "09:00 PM", type: "4DX", price: 480, available: true, totalSeats: 80, bookedSeats: 40 },
        ]
    }
];
