import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';

import { fileURLToPath } from 'url';

// middlewares imports
import authenticate from './middlewares/verifyAuthTokenMiddleware.js';
import logger from './middlewares/logger.js';

// routes imports
import authv1Routes from './routes/authv1Routes.js';
import projectRoutes from './routes/projectRoutes.js';

import individualProject from './controllers/projectControllers/getIndividualProject.js';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' })

dotenv.config();

const PORT = process.env.PORT || 8000;

const HOST = '0.0.0.0';

const app = express();

app.use(express.json());

// cors

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // Dynamically allow all origins
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Needed for authentication (cookies, JWT, etc.)
}));

// creating an authentication middleware


// creating a connection to mongoDb
mongoose
  .connect("mongodb://localhost/portfolio")
  .then(() => {
    console.log("connection created");
  })
  .catch((e) => {
    console.log(`Error connecting to db, Error: ${e}`);
    res.status(500).json({failure: "Data base error"})
  });


app.use(logger)

app.get('/login',(req, res) => {
    const __filePath = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filePath);

    res.status(200)
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.use('/api/auth', authv1Routes)

app.use('/api/project', projectRoutes); 
app.use('/api/project/:id', individualProject); 

app.get('/testAuth', authenticate, (req, res) => {
    console.log('Testing auth')
    console.log(req.user);
    res.status(201).json({success: true, message: 'authentication done'});
})

console.log('inside app')

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${PORT}`);
});