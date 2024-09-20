import {randomUserMock, additionalUsers} from './FE4U-Lab2-mock';
import {addFieldsToUsers, formatUsersAndAddFields, mergeUsers} from './formatting';
import {validateUsers} from './validation';
import {filterUsers} from "./filtering";
import {FilterParams} from "./interfaces";
import {sortUsers} from './sorting';
import {toJSON} from './tools'
import {findUsers} from "./search";
import {calcPercentOfFoundUsers} from "./percentage";

const formattedUsers = formatUsersAndAddFields(randomUserMock);
toJSON(formattedUsers, './../results/formatted.json');
const mergedUsers
    = mergeUsers(formattedUsers, addFieldsToUsers(additionalUsers));
toJSON(mergedUsers, './../results/mergedUsers.json');
console.log(`Formatted users num: ${formattedUsers.length}`);
console.log(`Additional users num: ${additionalUsers.length}`);
console.log(`Merged users num: ${mergedUsers.length} \n`);


const validatedUsers= validateUsers(mergedUsers);
toJSON(validatedUsers, './../results/validatedUsers.json')
console.log(`Num of validated users: ${validatedUsers.length}\n`);


const filters: FilterParams = {
    gender: "Male",
    country: 'Ireland',
    favorite: false,
};
const filteredUsers = filterUsers(validatedUsers, filters);
toJSON(filteredUsers, './../results/filteredUsers.json')
console.log(`Num of filtered users: ${filteredUsers.length}\n`);


const sortedUsers = sortUsers(validatedUsers, 'country', 'desc');
toJSON(sortedUsers, './../results/sortedUsers.json')
console.log(`Users were sorted\n`);


const searchParam = '30-40';

const searchResult = findUsers(validatedUsers, searchParam);
toJSON(searchResult, './../results/foundUsers.json');
console.log(`Users found: ${searchResult.length}\n`);


const percent = calcPercentOfFoundUsers(validatedUsers, searchParam);
console.log(`Percent of found users: ${percent}`);
