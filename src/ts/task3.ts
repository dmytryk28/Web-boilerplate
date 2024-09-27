import {UserFormatted} from "./users-processing/interfaces";
import {Order, sortUsers} from "./users-processing/sorting";
import {validatedUsers} from "./users";
import {findById} from "./teacher-card";
import {teacherInfoPopup, updateTeacherInfoPopup} from "./task1";

const table = document.querySelector('#table')
const tableHeader = document.querySelector('#table-header')
const headers = table.querySelectorAll('th');

let direction: Order = 'asc';
let sortColumn = null;

const map = {
    'Name': 'full_name',
    'Specialty': 'course',
    'Age': 'b_day',
    'Gender': 'gender',
    'Nationality': 'country'
};

tableHeader.addEventListener('click', event => {
   const column = event.target as HTMLElement;
   headers.forEach(column => column.classList.remove('sorted-asc', 'sorted-desc'))
   if (sortColumn !== null && sortColumn === map[column.innerText]) {
       direction = direction === 'asc'? 'desc' : 'asc';
   } else {
       sortColumn = map[column.innerText];
       direction = 'asc';
   }

   column.classList.add('sorted-' + direction)
   addTeachersInTable(sortUsers(validatedUsers, sortColumn, direction));
});



export function addTeachersInTable(teachers: UserFormatted[]) {
    let html = '';
    teachers.forEach(user => {
        html += formatTableRow(user);
    })
    table.innerHTML = html;
    table.prepend(tableHeader);
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
        row.addEventListener('click', event => {
            const userID = (event.target as HTMLElement).closest('tr')
                .getAttribute('data-user-id');
            updateTeacherInfoPopup(findById(userID));
            teacherInfoPopup.showModal();
        });
    });
}

function formatTableRow(teacher: UserFormatted) {
    return `
        <tr data-user-id="${teacher.id}"">
            <td>${teacher.full_name}</td>
            <td>${teacher.course}</td>
            <td>${teacher.age}</td>
            <td>${teacher.gender}</td>
            <td>${teacher.country}</td>
        </tr>
    `;
}
