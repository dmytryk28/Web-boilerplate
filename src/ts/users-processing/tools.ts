import {Course, courses} from './interfaces';

export function capitalizeWord(word: string) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

export function generateId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

export function getRandomCourse(): Course {
    return courses[Math.floor(Math.random() * courses.length)];
}
