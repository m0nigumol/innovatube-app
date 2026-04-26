import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: String }]
});

export default model('User', UserSchema);

/* 
    FOR THE TEST THE USER SHOULD CONTAIN AT LEAST THE FOLLOWING FIELDS:
    - NAME
    - LASTNAME
    - USERNAME
    - EMAIL
    - PASSWORD
    - FAVORITES (ARRAY OF VIDEO IDS)
 */

/* JSON EXAMPLE FOR TESTING PURPOSES
{
    "firstName": "",
    "lastName": "",
    "username": "",
    "email": "",
    "password": "",
    "favorites": ""
} 
*/