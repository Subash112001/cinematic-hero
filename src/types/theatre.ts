export interface Showtime {
    id: string;
    time: string;
    type: "2D" | "3D" | "IMAX" | "4DX";
    price: number;
    available: boolean; // false if sold out
    totalSeats: number;
    bookedSeats: number;
}

export interface Theatre {
    id: string;
    name: string;
    location: string;
    distance: string; // e.g., "2.5 km away"
    facilities: string[]; // e.g., ["Dolby Atmos", "Food Court"]
    showtimes: Showtime[];
}
