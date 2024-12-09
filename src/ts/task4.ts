import {addTeachersOnGrid} from "./task1";
import {findUsers} from "./users-processing/search";
import {validatedUsers} from "./users";
import {clearFilters} from "./task2";
import {addTeachersInTable} from "./task3";

const searchInput = document.querySelector<HTMLInputElement>('#search-input')
const searchForm = document.querySelector<HTMLFormElement>('.search-form');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearFilters();
    const foundUsers = findUsers(validatedUsers, searchInput.value.trim());
    addTeachersOnGrid(foundUsers);
    addTeachersInTable(foundUsers);
});

export function clearSearchInput() {
    searchInput.value = '';
}
