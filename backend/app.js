import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';

import { fileURLToPath } from 'url';
import bcrypt from "bcrypt"


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

// app.options('*', cors());

let prodOrigin = "http://69.164.244.56"
let devOrigin = "http://localhost:5173"

const corsOptions = {
  origin: prodOrigin,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

app.use(cors(corsOptions));

// creating a connection to mongoDb
// the env variable mongo_uri is created from docker when starting the backend container

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connection created");
  })
  .catch((e) => {
    console.log(`Error connecting to db, Error: ${e}`);
  });

  const getpass = async ()=>{
    console.log(await bcrypt.hash("myPassword", 13))
  }

  getpass()


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
