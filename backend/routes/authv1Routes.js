import express from 'express'

import authenticate from '../middlewares/verifyAuthTokenMiddleware.js';

import verifyAuth from '../controllers/authControllers/verifyAuthController.js';
import { limiter } from '../middlewares/limiter.js';
import { login } from '../controllers/authControllers/loginController.js';
import { token } from '../controllers/authControllers/tokenController.js';
import { logout } from '../controllers/authControllers/logoutController.js';
import { register } from '../controllers/authControllers/registerController.js';

const authv1Routes = express.Router();

authv1Routes.post('/register', limiter, register)

authv1Routes.post('/login', limiter, login);

authv1Routes.post('/verifyToken', authenticate, verifyAuth); 

authv1Routes.post('/token', authenticate, token);

authv1Routes.post('/logout', logout)

export default authv1Routes