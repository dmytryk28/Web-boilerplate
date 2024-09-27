const testModules = require('./test-module');
require('../css/app.css');

/** ******** Your code here! *********** */

console.log(testModules.hello);

const scrollContainer = document.querySelector('.scroll');
const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');

const addTeacherBtn = document.querySelectorAll('.add-teacher');
const addTeacherPopup = document.querySelector('#add-teacher');
const addTeacherCloseBtn = document.querySelector('#add-close-btn');
const teacherInfoCloseBtn = document.querySelector('#info-close-btn');

const teachersImages = document.querySelectorAll('.teacher-image');
const teacherInfoPopup = document.querySelector('#teacher-info');

leftBtn.addEventListener('click', () => {
  if (window.innerWidth > 600) {
    scrollContainer.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
  } else {
    scrollContainer.scrollBy({
      left: -282,
      behavior: 'smooth',
    });
  }
});

rightBtn.addEventListener('click', () => {
  if (window.innerWidth > 600) {
    scrollContainer.scrollBy({
      left: 200,
      behavior: 'smooth',
    });
  } else {
    scrollContainer.scrollBy({
      left: 282,
      behavior: 'smooth',
    });
  }
});

addTeacherBtn.forEach((btn) => btn.addEventListener('click', () => {
  addTeacherPopup.classList.add('visible');
}));

teachersImages.forEach((teacher) => teacher.addEventListener('click', () => {
  teacherInfoPopup.classList.add('visible');
}));

addTeacherCloseBtn.addEventListener('click', () => {
  addTeacherPopup.classList.remove('visible');
});

teacherInfoCloseBtn.addEventListener('click', () => {
  teacherInfoPopup.classList.remove('visible');
});
