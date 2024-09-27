import {filterUsers} from "./users-processing/filtering";
import {addTeachersOnGrid} from "./task1";
import {validatedUsers} from "./users";
import {clearSearchInput} from "./task4";
import {addTeachersInTable} from "./task3";
import {FilterParams} from "./users-processing/interfaces";

const age = document.querySelector<HTMLSelectElement>('#age');
const region = document.querySelector<HTMLSelectElement>('#region');
const gender = document.querySelector<HTMLSelectElement>('#sex');
const withPhoto = document.querySelector<HTMLInputElement>('#photo');
const isFavorite = document.querySelector<HTMLInputElement>('#only-favorites');

let filters: FilterParams = {};

export function clearFilters() {
    filters = {};
    age.selectedIndex = 0;
    region.selectedIndex = 0;
    gender.selectedIndex = 0;
    withPhoto.checked = false;
    isFavorite.checked = false;
}

function addSelectFilterEvent(element: HTMLSelectElement | HTMLInputElement, field: string) {
    element.addEventListener('change', () => {
        if (element instanceof HTMLSelectElement) {
            filters[field] = element.options[element.selectedIndex].text;
        } else {
            if (element.checked) filters[field] = element.checked;
            else delete filters[field];
        }
        if (filters[field] === '') {
            delete filters[field];
        }
        clearSearchInput();
        const filteredUsers = filterUsers(validatedUsers, filters);
        addTeachersOnGrid(filteredUsers);
        addTeachersInTable(filteredUsers);
    });
}

addSelectFilterEvent(age, 'age');
addSelectFilterEvent(region, 'region');
addSelectFilterEvent(gender, 'gender');
addSelectFilterEvent(withPhoto, 'withPhoto');
addSelectFilterEvent(isFavorite, 'favorite');
