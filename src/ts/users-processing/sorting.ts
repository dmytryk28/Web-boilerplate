import { UserFormatted } from "./interfaces";
import {orderBy} from 'lodash';

type SortingField = 'full_name' | 'gender' | 'course' | 'age' | 'country';
export type Order = 'asc' | 'desc';

export function sortUsers(users: UserFormatted[], field: SortingField, order: Order = 'asc'): UserFormatted[] {
    return orderBy(users, [field], [order]);
}
