/* 
    THIS FILE CONTAINS THE SCHEMA FOR THE USER MODEL
    IT ALLOWS US TO CREATE A USER DOCUMENT IN THE DB
    WITH THE FOLLOWING FIELDS, SPECIFIC TYPES, AND DEFAULT VALUES
*/

import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    // NOMBRE
    firstName: { type: String, required: true },
    // APELLIDO
    lastName: { type: String, required: true },
    // USERNAME
    username: { type: String, required: true, unique: true },
    // EMAIL
    email: { type: String, required: true, unique: true },
    // PASSWORD
    password: { type: String, required: true },
    // FAVORITES LIST
    favorites: {
        // SAVE VIDEO OBJECT FROM YOUTUBE
        type: [Object],
        default: []
    }
});

export default model('User', UserSchema);