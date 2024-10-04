import {addTeachersOnPage} from "./teachers";
import {findUsers} from "../users-processing/search";
import {clearFilters} from "./filtering";
import {clearSorting} from "./sorting";
import {appData} from "../app-data";

const searchInput = document.querySelector<HTMLInputElement>('#search-input')
const searchForm = document.querySelector<HTMLFormElement>('.search-form');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearFilters();
    clearSorting();
    appData.setDisplayedTeachers(findUsers(appData.getTeachers(), searchInput.value.trim()));
    addTeachersOnPage();
});

export function clearSearchInput() {
    searchInput.value = '';
}
