import {findById, formatShortCard, formatCard} from "./teacher-card";
import {UserFormatted} from "./users-processing/interfaces";
import {validatedUsers} from "./users";
import {clearFilters} from "./task2";
import {addTeachersInTable} from "./task3";

const teacherInfoCloseBtn = document.querySelector<HTMLElement>('#info-close-btn');
export const teacherInfoPopup = document.querySelector<HTMLDialogElement>('#teacher-info');
const teacherGrid = document.querySelector('.all-teachers') as HTMLElement;
const scrollContainer = document.querySelector('.scroll') as HTMLElement;
const leftBtn = document.querySelector('.scroll-btn.left') as HTMLElement;
const rightBtn = document.querySelector('.scroll-btn.right') as HTMLElement;
const favoriteBtn = document.querySelector(".favorite-btn") as HTMLElement;

favoriteBtn.addEventListener('click', event => {
    const teacherInfoElem = (event.target as HTMLElement).closest<HTMLElement>('.main-teacher-info');
    const userID = teacherInfoElem.getAttribute('data-user-id');
    const user = findById(userID);
    user.favorite = !user.favorite;
    favoriteBtn.innerText = favoriteBtn.innerText === '☆' ? '★' : '☆';
    addTeachersOnPage(validatedUsers);
    clearFilters();
});

function scrollCards(scrollLeft) {
    scrollContainer.scrollBy({
        left: scrollLeft,
        behavior: 'smooth'
    });
}

leftBtn.addEventListener('click', () => {
    if (window.innerWidth > 600) scrollCards(-200);
    else scrollCards(-282);
});

rightBtn.addEventListener('click', () => {
    if (window.innerWidth > 600) scrollCards(200);
    else scrollCards(282);
});


export function addTeachersOnPage(teachers: UserFormatted[]) {
    addTeachersOnGrid(teachers);
    addFavTeachersOnScroll(teachers);
    addTeachersInTable(teachers);
}

export function addTeachersOnGrid(teachers: UserFormatted[]) {
    let html = '';
    teachers.forEach(user => {
        html += formatCard(user);
    })
    teacherGrid.innerHTML = html;
}

function addFavTeachersOnScroll(teachers: UserFormatted[]) {
    let html = '';
    teachers.filter(user => user.favorite)
        .forEach(user => {
            html += formatShortCard(user);
        })
    scrollContainer.innerHTML = html;
}

function addShowPopupEvent(element: Element) {
    element.addEventListener('click', event => {
        const card = (event.target as HTMLElement).closest('.card');
        if (!card) return;

        const userID = card.getAttribute('data-user-id');
        updateTeacherInfoPopup(findById(userID));
        teacherInfoPopup.showModal();
    });
}

export function updateTeacherInfoPopup(user: UserFormatted) {
    const teacherInfoElem = document.querySelector<HTMLElement>('.main-teacher-info');
    teacherInfoElem.setAttribute('data-user-id', user.id);

    const teacherImage = teacherInfoElem.children[0];
    teacherImage.children[0].setAttribute("src", user.picture_large?? '../images/photo.jpg');

    const teacherInfo = teacherInfoElem.children[1].children as HTMLCollection;
    updateElementText(teacherInfo[0], user.full_name);
    updateElementText(teacherInfo[1], user.course);
    updateElementText(teacherInfo[2], `${user.city}, ${user.country}`);
    updateElementText(teacherInfo[3], `${user.age}, ${user.gender}`);
    updateElementText(teacherInfo[4], user.email);
    updateElementText(teacherInfo[5], user.phone);
    updateElementText(teacherInfo[6], user.favorite ? '★' : '☆');

    document.querySelector<HTMLElement>('.description').innerText = user.note;
}

function updateElementText(element: Element | undefined, text: string) {
    if (element) {
        (element as HTMLElement).innerText = text;
    }
}

addShowPopupEvent(teacherGrid);
addShowPopupEvent(scrollContainer);

teacherInfoCloseBtn.addEventListener('click', () => {
    teacherInfoPopup.close();
});

