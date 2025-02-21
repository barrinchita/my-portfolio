
import rateLimit from 'express-rate-limit';

// creating a rate limiter middleware for routes

export const limiter = rateLimit({ 
    windowMs: 10 * 60 * 1000, // 15 minutes 
    max: 5, // Limit each IP to 100 requests per windowMs 
    message: 'Too many requests from this IP, please try again later.', 
});