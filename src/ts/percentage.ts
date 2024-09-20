import {UserFormatted} from './interfaces';
import {findUsers} from "./search";

export function calcPercentOfFoundUsers(users: UserFormatted[], param: string) {
    return (findUsers(users, param).length / users.length) * 100.0;
}
