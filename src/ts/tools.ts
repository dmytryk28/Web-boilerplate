import {Course, courses} from './interfaces';
import * as fs from 'fs';
import * as path from 'path';

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

export function toJSON(users: any, filePath: string): void {
    const data = JSON.stringify(users, null, 2); // Pretty print JSON with 2 spaces
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(filePath, data, 'utf8', (err) => {
        if (err) {
            console.error('An error occurred while writing to the file:', err);
        }
    });
}

export function getRandomCourse(): Course {
    return courses[Math.floor(Math.random() * courses.length)];
}
