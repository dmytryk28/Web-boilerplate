import {formatShortCard, formatCard} from "../teacher-card";
import {UserFormatted} from "../users-processing/interfaces";
import {clearFilters} from "./filtering";
import {addTeachersInTable} from "./sorting";
import {addPagination} from "./pagination";
import {appData} from "../app-data";

const teacherInfoCloseBtn = document.querySelector<HTMLElement>('#info-close-btn');
const teacherInfoPopup = document.querySelector<HTMLDialogElement>('#teacher-info');
const teacherGrid = document.querySelector('.all-teachers') as HTMLElement;
const scrollContainer = document.querySelector('.scroll') as HTMLElement;
const leftBtn = document.querySelector('.scroll-btn.left') as HTMLElement;
const rightBtn = document.querySelector('.scroll-btn.right') as HTMLElement;
const favoriteBtn = document.querySelector(".favorite-btn") as HTMLElement;
const teacherScroll = document.querySelector('.scroll');


favoriteBtn.addEventListener('click', event => {
    const teacherInfoElem = (event.target as HTMLElement).closest<HTMLElement>('.main-teacher-info');
    const userID = teacherInfoElem.getAttribute('data-user-id');
    const user = appData.getTeacherById(userID);
    user.favorite = !user.favorite;
    favoriteBtn.innerText = favoriteBtn.innerText === '☆' ? '★' : '☆';
    addTeachersOnPage();
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

export function addTeachersOnPage() {
    addTeachersOnGrid();
    addFavTeachersOnScroll();
    addTeachersInTable();
    addPagination();
}

export function addTeachersOnGrid() {
    let html = '';
    appData.getDisplayedTeachers().forEach(user => {
        html += formatCard(user);
    })
    teacherGrid.innerHTML = html;
}

function addFavTeachersOnScroll() {
    let html = '';
    appData.getDisplayedTeachers().filter(user => user.favorite)
        .forEach(user => {
            html += formatShortCard(user);
        })
    teacherScroll.innerHTML = html;
}

function addShowPopupEvent(element: Element) {
    element.addEventListener('click', event => {
        const card = (event.target as HTMLElement).closest('.card');
        if (!card) return;
        const userID = card.getAttribute('data-user-id');
        updateTeacherInfoPopup(appData.getTeacherById(userID));
        teacherInfoPopup.showModal();
    });
}

addShowPopupEvent(teacherGrid);
addShowPopupEvent(teacherScroll);

teacherInfoCloseBtn.addEventListener('click', () => {
    teacherInfoPopup.close();
});

function updateTeacherInfoPopup(user: UserFormatted) {
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

