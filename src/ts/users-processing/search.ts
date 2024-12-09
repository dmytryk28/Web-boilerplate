import { UserFormatted } from './interfaces';
import _ from 'lodash';

export function findUsers(users: UserFormatted[], param: string): UserFormatted[] {
    const ageBoundRegex = /^(<=|>=|<|>|=)\s*(\d+)$/;
    const matchAgeBound = param.match(ageBoundRegex);
    if (matchAgeBound) {
        return findByAgeBound(users, matchAgeBound);
    }

    const ageIntervalRegex = /^(\d+)\s*(-)\s*(\d+)$/;
    const matchAgeInterval = param.match(ageIntervalRegex);
    if (matchAgeInterval) {
        return findByAgeInterval(users, matchAgeInterval);
    }

    return _.filter(users, user =>
        _.includes(_.toLower(user.full_name), _.toLower(param)) ||
        _.includes(_.toLower(user.full_name) || '', _.toLower(param)) ||
        user.age === Number(param)
    );
}

export function getPredicateFunc(operator: string): (a: number, b: number) => boolean {
    switch (operator) {
        case '>': return _.gt;
        case '>=': return _.gte;
        case '<': return _.lt;
        case '<=': return _.lte;
        case '=': return _.eq;
        default: return () => false;
    }
}

function findByAgeBound(users: UserFormatted[], match: string[]): UserFormatted[] {
    const [a, operator, num] = match;
    const predicateFunc = getPredicateFunc(operator);
    return _.filter(users,
            user => predicateFunc(user.age ?? 0, Number(num)));
}

function findByAgeInterval(users: UserFormatted[], match: string[]) {
    const firstNum = Number(match[1]);
    const secondNum = Number(match[3]);
    return _.filter(users, user =>
        (user.age ?? 0) >= firstNum && (user.age ?? 0) <= secondNum
    );
}
