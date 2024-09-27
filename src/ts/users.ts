import {additionalUsers, randomUserMock} from './FE4U-Lab2-mock.js';
import {addFieldsToUsers, formatUsersAndAddFields, mergeUsers} from "./users-processing/formatting";
import {validateUsers} from "./users-processing/validation";

const mergedUsers = mergeUsers(formatUsersAndAddFields(randomUserMock), addFieldsToUsers(additionalUsers));
export const validatedUsers = validateUsers(mergedUsers);
