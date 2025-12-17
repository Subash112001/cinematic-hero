export interface Movie {
    id: string;
    title: string;
    image: string;
    video?: string;
    tags: string[];
    rating: string;
    duration: string;
    description: string;
    language: string;
    format: string[]; // e.g., ["2D", "3D", "IMAX"]
    releaseDate?: string;
    quote?: string;
    quoteAuthor?: string;
}
