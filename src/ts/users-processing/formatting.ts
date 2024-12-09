import { UserFormatted, Gender } from './interfaces';
import { capitalizeWord, generateId, getRandomCourse } from './tools';
import _ from 'lodash';

export function mergeUsers(users: UserFormatted[], additionalUsers: UserFormatted[]): UserFormatted[] {
    return getDistinctUsers(_.concat(users, additionalUsers));
}

function getDistinctUsers(users: UserFormatted[]): UserFormatted[] {
    return _.uniqBy(users, 'email');
}

export function formatUsersAndAddFields(users: any[]): UserFormatted[] {
    return _.map(users, user => addMissingFields(formatUser(user)));
}

export function addFieldsToUsers(users: any[]): UserFormatted[] {
    return _.map(users, addMissingFields);
}

function addMissingFields(user: any): UserFormatted {
    return _.merge({}, user, {
        id: user.id || generateId(13),
        favorite: _.get(user, 'favorite', false),
        course: user.course || getRandomCourse(),
        bg_color: user.bg_color || getRandomColorHex(),
        note: _.get(user, 'note', 'Note...')
    });
}

function getRandomColorHex(): string {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function formatUser(user: any): Partial<UserFormatted> {
    return {
        gender: capitalizeWord(user.gender) as Gender,
        title: _.get(user, 'name.title'),
        full_name: _.get(user, 'name.first') + ' ' + _.get(user, 'name.last'),
        city: _.get(user, 'location.city'),
        state: _.get(user, 'location.state'),
        country: _.get(user, 'location.country'),
        postcode: _.get(user, 'location.postcode'),
        coordinates: _.get(user, 'location.coordinates'),
        timezone: _.get(user, 'location.timezone'),
        email: _.get(user, 'email'),
        b_day: _.get(user, 'dob.date'),
        age: _.get(user, 'dob.age'),
        phone: _.get(user, 'phone'),
        picture_large: _.get(user, 'picture.large'),
        picture_thumbnail: _.get(user, 'picture.thumbnail'),
        favorite: _.get(user, 'favorite', false)
    };
}
