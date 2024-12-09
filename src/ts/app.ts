import '../css/app.css';
import './page/teacher-form';
import {addTeachersOnPage} from "./page/teachers";
import './page/filtering';
import './page/search';
import './page/teacher-form';
import {fetchTeachers} from "./users";
import {formatUsersAndAddFields} from "./users-processing/formatting";
import {validateUsers} from "./users-processing/validation";
import {UserFormatted} from "./users-processing/interfaces";
import {preparePagination} from "./page/pagination";
import {appData} from "./app-data";

const minNumOfTeachers = 50;

document.addEventListener('DOMContentLoaded', async () =>  {
    let validatedTeachers: UserFormatted[] = [];
    while (validatedTeachers.length <= minNumOfTeachers) {
        const teachers = await fetchTeachers(minNumOfTeachers);
        if (teachers === undefined) {
            await new Promise(r => setTimeout(r, 500));
            continue;
        }
        console.log(validateUsers(formatUsersAndAddFields(teachers)));
        validatedTeachers = validatedTeachers.concat(validateUsers(formatUsersAndAddFields(teachers)));
    }
    appData.setTeachers(validatedTeachers.slice(0,minNumOfTeachers));
    preparePagination();
    addTeachersOnPage();
})
