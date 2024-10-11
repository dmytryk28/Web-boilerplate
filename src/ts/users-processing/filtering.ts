import { UserFormatted, FilterParams } from './interfaces';
import { getPredicateFunc } from "./search";
import _ from 'lodash';

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
    return _.filter(users, (user) => applyFilters(user, filters));
}

function applyFilters(user: UserFormatted, filters: FilterParams): boolean {
    return _.every(filters, (value, key) => {
        if (key === 'age' && value !== undefined) {
            return applyAgeFilter(user.age, value as number | string);
        }
        if (key === 'withPhoto' && value !== undefined) {
            return !_.isNil(user.picture_large);
        }
        if (key === 'region' && user.country !== undefined) {
            return _.includes(regions[filters.region], user.country);
        }
        return _.get(user, key) === value;
    });
}

function applyAgeFilter(userAge: number | undefined, ageFilter: number | string): boolean {
    if (_.isNumber(ageFilter)) {
        return userAge === ageFilter;
    }
    const [lower, upper] = _.split(ageFilter, '-').map(Number);
    return userAge >= lower && userAge <= upper;
}
