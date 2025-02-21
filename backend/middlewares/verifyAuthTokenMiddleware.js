import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
        console.log("Authorization header missing or invalid format");
        return res.status(401).json({
            success: false, 
            message: "Authorization header missing or invalid format"
        });
    }
  
    const accessToken = authHeader.split(' ')[1];
    try {
        const verify = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);
        req.user = verify;
        next();
    } catch(error) {
        console.log("Token verification failed:", error.message);
        return res.status(401).json({
            success: false, 
            message: 'Invalid or expired token'
        });
    }
  }

export default authenticate;