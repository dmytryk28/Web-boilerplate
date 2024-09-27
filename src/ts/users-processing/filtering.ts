import {UserFormatted, Gender, FilterParams} from './interfaces';
import {getPredicateFunc} from "./search";



const regions: { [key: string]: string[] } = {
    'Europe': [
        "Ireland", "Finland", "Germany", "Switzerland", "Spain",
        "Norway", "Denmark", "France", "Netherlands"
    ],
    'Asia': [
        "Iran", "Turkey"
    ],
    'America': [
        "United States", "Canada"
    ]
};

export function filterUsers(users: UserFormatted[], filters: FilterParams): UserFormatted[] {
    return users.filter(user => applyFilters(user, filters));
}

function applyFilters(user: UserFormatted, filters: FilterParams): boolean {
    return Object.keys(filters).every(key => {
        if (key === 'age' && filters.age !== undefined) {
            return applyAgeFilter(user.age, filters.age);
        }
        if (key === 'withPhoto' && filters.withPhoto !== undefined) {
            return user.picture_large !== undefined && user.picture_large !== null;
        }
        if (key === 'region' && user.country !== undefined) {
            return regions[filters.region].includes(user.country);
        }
        return user[key] === filters[key];
    });
}

function applyAgeFilter(userAge: number | undefined, ageFilter: number | string): boolean {
    if (typeof ageFilter === 'number') {
        return userAge === ageFilter;
    }
    const parts = ageFilter.split('-');
    const lower = Number(parts[0]);
    const upper = Number(parts[1]);
    return userAge >= lower && userAge <= upper;
}
