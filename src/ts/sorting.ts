import {UserFormatted} from './interfaces';

type SortingField = 'full_name' | 'age' | 'b_day' | 'country';
type Order = 'asc' | 'desc';

export function sortUsers(users: UserFormatted[], field: SortingField, order: Order = 'asc'): UserFormatted[] {
    if (isStringField(field)) {
        return sortUsersByStringField(users, field, order);
    } else if (field === 'age') {
        return sortUsersByNumField(users, field, order);
    } else {
        return sortUsersByDateField(users, field, order);
    }
}

function isStringField(field: string): boolean {
    return field === 'full_name' || field === 'country';
}

function sortUsersByStringField(users: UserFormatted[], field: SortingField, order: Order = 'asc'): UserFormatted[] {
    return users.sort((a, b) => {
        const fieldA = a[field] as string;
        const fieldB = b[field] as string;
        return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    });
}

function sortUsersByNumField(users: UserFormatted[], field: SortingField, order: Order = 'asc'): UserFormatted[] {
    return users.sort((a, b) => {
        const fieldA = a[field] as number;
        const fieldB = b[field] as number;
        return order === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    });
}

function sortUsersByDateField(users: UserFormatted[], field: SortingField, order: Order = 'asc'): UserFormatted[] {
    return users.sort((a, b) => {
        const fieldA = new Date(a[field] as string);
        const fieldB = new Date(b[field] as string);
        return order === 'asc' ? fieldA.getTime() - fieldB.getTime() : fieldB.getTime() - fieldA.getTime();
    });
}
