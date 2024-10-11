import {UserFormatted} from "../users-processing/interfaces";
import {Order, sortUsers} from "../users-processing/sorting";
import {addPagination, recordsPerPage} from "./pagination";
import {appData} from "../app-data";

const table = document.querySelector('#table')
const tableHeader = document.querySelector('#table-header')
const headerCells = table.querySelectorAll('th');

let direction: Order = 'asc';
let sortColumn = null;

const map = {
    'Name': 'full_name',
    'Specialty': 'course',
    'Age': 'age',
    'Gender': 'gender',
    'Nationality': 'country'
};

tableHeader.addEventListener('click', event => {
   const column = event.target as HTMLElement;

   clearSorting();
   if (sortColumn !== null && sortColumn === map[column.innerText]) {
       direction = direction === 'asc' ? 'desc' : 'asc';
   } else {
       sortColumn = map[column.innerText];
       direction = 'asc';
   }
   column.classList.add('sorted-' + direction);
   appData.setDisplayedTeachers(sortUsers(appData.getDisplayedTeachers(), sortColumn, direction));
   addTeachersInTable();
   addPagination();
});

export function clearSorting() {
    headerCells.forEach(column => column.classList.remove('sorted-asc', 'sorted-desc'));
}

export function addTeachersInTable() {
    const offset = recordsPerPage * (appData.currentPage - 1)
    let html = '';
    appData.getDisplayedTeachers().slice(offset, offset + recordsPerPage).forEach(user => {
        html += formatTableRow(user);
    })
    table.innerHTML = html;
    table.prepend(tableHeader);
}

function formatTableRow(teacher: UserFormatted) {
    return `
        <tr>
            <td>${teacher.full_name}</td>
            <td>${teacher.course}</td>
            <td>${teacher.age}</td>
            <td>${teacher.gender}</td>
            <td>${teacher.country}</td>
        </tr>
    `;
}
