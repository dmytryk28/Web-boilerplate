import { UserFormatted } from './interfaces';
import { getCountryCode } from 'countries-list';
import { CountryCode, isValidPhoneNumber } from "libphonenumber-js";
import _ from 'lodash';

export function validateUsers(users: UserFormatted[]) {
    return _.filter(users, validateUser);
}

function validateUser(user: UserFormatted): boolean {
    return _.every([
        valStrField(user.full_name),
        valStrField(user.gender),
        valStrField(user.note),
        valStrField(user.state),
        valStrField(user.city),
        valStrField(user.country),
        valNumField(user.age),
        valPhoneNum(user.phone, user.country),
        valEmail(user.email)
    ]);
}

function valStrField(field: any): boolean {
    return _.isString(field) && _.upperFirst(field) === field;
}

function valNumField(field: any): boolean {
    return _.isNumber(field);
}

function valPhoneNum(phoneNum: any, country: any): boolean {
    if (_.isString(phoneNum) && _.isString(country)) {
        const countryCode = getCountryCode(country);
        if (!countryCode) {
            return false;
        }
        return isValidPhoneNumber(phoneNum, countryCode as CountryCode);
    }
    return false;
}

function valEmail(email: any): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return _.isString(email) && emailRegex.test(email);
}
