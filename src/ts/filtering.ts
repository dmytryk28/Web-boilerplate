import {UserFormatted, FilterParams} from './interfaces';


function applyFilters(user: UserFormatted, filters: FilterParams): boolean {
    return Object.keys(filters).every(key => {
        return user[key] === filters[key];
    });
}

export function filterUsers(users: UserFormatted[], filters: FilterParams): UserFormatted[] {
    return users.filter(user => applyFilters(user, filters));
}

