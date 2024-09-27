import {Gender, UserFormatted} from "./users-processing/interfaces";
import {validatedUsers} from "./users";
import {addTeachersOnPage} from "./task1";
import {generateId} from "./users-processing/tools";

const form = document.querySelector<HTMLFormElement>('#add-teacher-form');
const addTeacherBtn = document.querySelectorAll('.add-teacher');
const addTeacherCloseBtn = document.querySelector<HTMLElement>('#add-close-btn');
const addTeacherPopup = document.querySelector<HTMLDialogElement>('#add-teacher');

addTeacherBtn.forEach(btn => btn.addEventListener('click', () => {
    addTeacherPopup.showModal();
}));

addTeacherCloseBtn.addEventListener('click', () => {
    addTeacherPopup.close();
});


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const formObject = Object
        .fromEntries(new FormData(form).entries()) as Partial<UserFormatted>;
    formObject.age = new Date().getFullYear() - new Date(formObject.b_day).getFullYear();
    formObject.favorite = false;
    formObject.id = generateId(13);
    formObject.gender = formObject.gender.charAt(0).toLocaleUpperCase()
        + formObject.gender.slice(1) as Gender;
    validatedUsers.push(formObject as UserFormatted);
    addTeachersOnPage(validatedUsers);
    form.reset();
    addTeacherPopup.close();
});

const today = new Date();
const year18Ago = today.getFullYear() - 18;
const month = today.getMonth() + 1;
const day = today.getDate();

const maxDate = `${year18Ago}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

document.getElementById('date').setAttribute('max', maxDate);
