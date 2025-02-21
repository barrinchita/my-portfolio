import mongoose, { mongo } from "mongoose";

// http://localhost8000/api/auth/register
// {
//     "name": "new name",
//     "email": "new@gmail.com",
//     "password": "newpassword"
// }

const signUp = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

export const User = mongoose.model("Admin", signUp);

const refereshToken = new mongoose.Schema({
    userId: String,
    username: String,
    token: String
})

export const RefreshTokens = mongoose.model("RefreshTokens", refereshToken);
