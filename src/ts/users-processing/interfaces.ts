export interface FilterParams {
    region?: string;
    age?: number | string;
    gender?: Gender;
    favorite?: boolean;
    withPhoto?: boolean;
}

export interface UserFormatted {
    id: string,
    favorite: boolean,
    course: Course,
    bg_color: string,
    note: string,
    gender: Gender,
    title: Title,
    full_name: string,
    city: string,
    state?: string,
    country: string,
    postcode: number,
    coordinates: Coordinate,
    timezone: Timezone,
    email?: string,
    b_day?: string,
    age?: number,
    phone?: string,
    picture_large?: string,
    picture_thumbnail?: string
}

export interface Coordinate {
    latitude: string,
    longitude: string
}

export interface Timezone {
    offset: string,
    description: string
}

export type Gender = "Male" | "Female" | "Other";

export type Title = "Mr" | "Ms" | "Miss" | "Mrs" | "Monsieur" | "Madame";

export type Course = "Mathematics" | "Physics" | "English" | "Computer Science"
    | "Dancing" | "Chess" | "Biology" | "Chemistry" | "Law" | "Art" | "Medicine" | "Statistics";

export const courses: Course[] = [
    "Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology",
    "Chemistry", "Law", "Art", "Medicine", "Statistics"
];
