import {UserFormatted, Gender} from './interfaces';
import {capitalizeWord, generateId, getRandomCourse} from './tools';

export function mergeUsers(users: UserFormatted[], additionalUsers: UserFormatted[]): UserFormatted[] {
    return getDistinctUsers(users.concat(additionalUsers));
}

function getDistinctUsers(users: UserFormatted[]): UserFormatted[] {
    return users.filter((item, index, self) =>
        index === self.findIndex(t => t.email === item.email)
    );
}

export function formatUsersAndAddFields(users: any[]): UserFormatted[] {
    return users.map(user => addMissingFields(formatUser(user)));
}

export function addFieldsToUsers(users: any[]): UserFormatted[] {
    return users.map(user => addMissingFields(user));
}

function addMissingFields(user: any): UserFormatted {
    return {
        ...user,
        id: user.id || generateId(13),
        favorite: user.favorite || false,
        course: user.course || getRandomCourse(),
        bg_color: user.bg_color || "#ffffff",
        note: user.note || "Note",
    };
}

function formatUser(user: any): Partial<UserFormatted> {
    return {
        gender: capitalizeWord(user.gender) as Gender,
        title: user.name.title,
        full_name: user.name.first + ' ' + user.name.last,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
        postcode: user.location.postcode,
        coordinates: user.location.coordinates,
        timezone: user.location.timezone,
        email: user.email,
        b_day: user.dob.date,
        age: user.dob.age,
        phone: user.phone,
        picture_large: user.picture.large,
        picture_thumbnail: user.picture.thumbnail
    };
}
