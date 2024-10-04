import {UserFormatted} from "./users-processing/interfaces";
import {addTablePage, recordsPerPage} from "./page/pagination";


export interface AppData {
    teachers: UserFormatted[],
    displayedTeachers: UserFormatted[],
    currentPage: number,
    numOfPages: number,
    addTeacher: (user: UserFormatted) => void;
    addTeachersList: (user: UserFormatted[]) => void;
    setTeachers: (users: UserFormatted[]) => void;
    getTeachers: () => UserFormatted[];
    getDisplayedTeachers: () => UserFormatted[];
    setDisplayedTeachers: (users: UserFormatted[]) => void;
    getTeacherById: (id: string) => UserFormatted;
}

export const appData: AppData = {
    teachers: [],
    displayedTeachers: [],
    currentPage: 1,
    numOfPages: 5,

    addTeacher(teacher: UserFormatted) {
        this.numOfPages = Math.ceil(this.teachers.length / recordsPerPage);
        this.teachers.push(teacher);
        this.displayedTeachers = this.teachers;
        if (this.numOfPages < Math.ceil(this.teachers.length / recordsPerPage)) {
            addTablePage();
        }
        this.numOfPages = Math.ceil(this.teachers.length / recordsPerPage);
    },

    addTeachersList(teachers: UserFormatted[]) {
        this.numOfPages = Math.ceil(this.teachers.length / recordsPerPage);
        this.teachers = this.teachers.concat(teachers);
        this.displayedTeachers = this.teachers;
        if (this.numOfPages < Math.ceil(this.teachers.length / recordsPerPage)) {
            addTablePage();
        }
        this.numOfPages = Math.ceil(this.teachers.length / recordsPerPage);
        this.currentPage = 1;
    },

    setTeachers(teachers: UserFormatted[]) {
        this.teachers = teachers;
        this.displayedTeachers = teachers;
        this.numOfPages = Math.ceil(this.teachers.length / recordsPerPage);
        this.currentPage = 1;
    },

    getTeachers() {
        return this.teachers;
    },

    getDisplayedTeachers() {
        return this.displayedTeachers;
    },

    setDisplayedTeachers(teachers: UserFormatted[]) {
        this.displayedTeachers = teachers;
        this.numOfPages = Math.ceil(this.displayedTeachers.length / recordsPerPage);
        this.currentPage = 1;
    },

    getTeacherById(id: string): UserFormatted {
        return this.teachers.find(t => t.id === id);
    },
};
