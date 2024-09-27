import {UserFormatted} from './interfaces';
import {findUsers} from "./search";

export function calcPercent(users: UserFormatted[], param: any) {
    return (findUsers(users, param).length / users.length) * 100.0;
}
