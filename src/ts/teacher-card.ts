import {UserFormatted} from "./users-processing/interfaces";
import {validatedUsers} from "./users";

export function formatCard(user: UserFormatted) {
    return `
        <div class="card" data-user-id=\'${user.id}\'>
            <div class="teacher-image" style="border-color: ${user.bg_color}">
                ${getImage(user)}
            </div>
            <div class="teacher-info">
                <p class="teacher-name">${user.full_name}</p>
                <p class="teacher-specialty">${user.course}</p>
                <p class="teacher-country">${user.country}</p>
            </div>
            ${(user.favorite ? '<span class="stared">★</span>' : '')}
        </div>
    `;
}

export function formatShortCard(user: UserFormatted) {
    return `
        <div class="card" data-user-id=\'${user.id}\'>
            <div class="teacher-image" style="border-color: ${user.bg_color}">
                ${getImage(user)}
           </div>
            <div class="teacher-info">
                <h3 class="teacher-name">${user.full_name}</h3>
                <p class="teacher-country">${user.country}</p>
            </div>
        </div>
    `;
}

function getImage(user: UserFormatted) {
    return user.picture_large? `<img src=${user.picture_large} alt="picture"/>` : `<span class="teacher-initials">${getInitials(user.full_name)}</span>`;
}

function getInitials(fullName: string) {
    const parts = fullName.split(' ');
    return `${parts[0].charAt(0).toLocaleUpperCase()}.${parts[1].charAt(0).toLocaleUpperCase()}.`;
}

export function findById(id: string) {
    return validatedUsers.find(user => user.id === id);
}
