import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

import { RefreshTokens } from '../../schemas/userSchema.js';

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

export const token = async (req, res) => {
    const refreshToken = req.body.token;
 
    if(!refreshToken) return res.status(401).json({success: false, message: "No refresh token "});

    const dbRefereshToken = await RefreshTokens.findOne({token: refreshToken}, {userId: 1, token: 1});

    if(dbRefereshToken === null) return res.status(401).json({success: false, message: "Refresh token not found"});

    let token = dbRefereshToken.token;

    // console.log(dbRefereshToken)

    try{
        const verify = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
        const accessToken = jwt.sign({username: verify.username, userId: verify.userId}, ACCESS_TOKEN_SECRET_KEY, {expiresIn: '1m'});

        console.log(accessToken)

        res.status(201).json({success: true, message: 'Token refreshed', accessToken: accessToken});
    }catch(error){
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ success: false, message: "Refresh token expired. Please log in again." });
          }
        console.log("Invalid token. Try login in.");
        res.status(400).json({success: false, message: 'Invalid Token'});
    }
}