const testModules = require('./test-module');
require('../css/app.css');

console.log(testModules.hello);

const addTeacherBtn = document.querySelectorAll('.add-teacher');
const addTeacherPopup = document.getElementById('add-teacher');
const addTeacherCloseBtn = document.getElementById('add-close-btn')
const infoCloseBtn = document.getElementById('info-close-btn')
const scrollContainer = document.querySelector('.scroll');
const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');
const teachersImages = document.querySelectorAll('.teacher-image')
const teacherInfoPopup = document.getElementById('teacher-info');


addTeacherBtn.forEach(btn =>
    btn.addEventListener('click', () => {
    addTeacherPopup.classList.add('visible');
}));

teachersImages.forEach(teacher =>
    teacher.addEventListener('click', () => {
    teacherInfoPopup.classList.add('visible');
}));

addTeacherCloseBtn.addEventListener('click', () => {
    addTeacherPopup.classList.remove('visible');
});

infoCloseBtn.addEventListener('click', () => {
    teacherInfoPopup.classList.remove('visible');
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
