import {addTeachersInTable, clearSorting} from "./sorting";
import {UserFormatted} from "../users-processing/interfaces";
import {fetchTeachers} from "../users";
import {validateUsers} from "../users-processing/validation";
import {formatUsersAndAddFields} from "../users-processing/formatting";
import {clearFilters} from "./filtering";
import {clearSearchInput} from "./search";
import {addTeachersOnPage} from "./teachers";
import {appData} from "../app-data";

export const recordsPerPage = 10;
const pagePagination = document.querySelector('.pagination');

pagePagination.addEventListener('click', event => {
    event.preventDefault();
    const link = (event.target as HTMLElement).closest('.page-link') as HTMLAnchorElement;
    if (!link) return;
    let page = link.innerText;
    appData.currentPage = page === 'Last' ? appData.numOfPages : Number(page);
    addTeachersInTable();
    addPagination();
});

let paginationElems: string[] = [];

export function preparePagination() {
    appData.numOfPages = Math.ceil(appData.getTeachers().length / recordsPerPage);
    for (let i = 1; i < appData.numOfPages; i++) {
        paginationElems.push(`<a href="#" class="page-link">${i}</a>`);
    }
    paginationElems.push(`<a href="#" class="page-link">Last</a>`);
    console.log(paginationElems);
}

export function addTablePage() {
    const newElem= `<a href="#" class="page-link">${appData.numOfPages}</a>`
    console.log(newElem)
    paginationElems = [
        ...paginationElems.slice(0, appData.numOfPages - 1),
        newElem,
        ...paginationElems.slice(appData.numOfPages - 1)
    ]
}

export function addPagination() {
    setupTablePaging();
    const offset = recordsPerPage * (appData.currentPage - 1)
}

function setupTablePaging() {
    let paginationElements = paginationElems[0];
    const currentPage = appData.currentPage;
    const numOfPages = appData.numOfPages;
    if (numOfPages <= 4) {
        for (let i = 2; i < numOfPages; i++) {
            paginationElements += paginationElems[i - 1];
        }
    } else {
        if (currentPage == 1 || currentPage == 2) { // OK
            paginationElements += paginationElems[1]; // 2
            paginationElements += paginationElems[2]; // 3
            paginationElements += '<span>...</span>';
        } else if (currentPage == numOfPages || currentPage == numOfPages - 1) { // OK
            paginationElements += '<span>...</span>';
            paginationElements += paginationElems[numOfPages - 3]; // pre pre last
            paginationElements += paginationElems[numOfPages - 2]; // pre last
        } else {
            if (currentPage - 3 <= 0) { // start
                for (let i = 0; i <= 2; i++) {
                    paginationElements += paginationElems[currentPage - 2 + i];
                }
                paginationElements += '<span>...</span>';
            } else if (currentPage + 2 >= numOfPages) { // end
                paginationElements += '<span>...</span>';
                for (let i = 0; i <= 2; i++) {
                    paginationElements += paginationElems[currentPage - 2 + i];
                }
            } else {
                paginationElements += '<span>...</span>';
                for (let i = 0; i <= 2; i++) {
                    paginationElements += paginationElems[currentPage - 2 + i];
                }
                paginationElements += '<span>...</span>';
            }
        }
    }
    if (numOfPages > 1) {
        paginationElements += paginationElems[paginationElems.length - 1];
    }
    pagePagination.innerHTML = paginationElements;
}

document.querySelector("#load-more-btn").addEventListener('click', async () => {
    console.log("Load more event");
    let validatedTeachers: UserFormatted[] = [];
    while (validatedTeachers.length <= recordsPerPage) {
        const teachers = await fetchTeachers(recordsPerPage);
        if (teachers === undefined) {
            await new Promise(r => setTimeout(r, 500));
            continue;
        }
        console.log(validateUsers(formatUsersAndAddFields(teachers)));
        validatedTeachers = validatedTeachers.concat(validateUsers(formatUsersAndAddFields(teachers)));
    }
    clearFilters();
    clearSorting();
    clearSearchInput();
    appData.addTeachersList(validatedTeachers.slice(0, recordsPerPage));
    addTeachersOnPage();
});
