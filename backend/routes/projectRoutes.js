import express from 'express';
import CreateProject from '../controllers/projectControllers/createprojects.js';
import getProjects from '../controllers/projectControllers/getProjects.js';
import createProjectType from '../controllers/projectControllers/createProjectType.js';
import getProjectTpe from '../controllers/projectControllers/getProjectTypes.js';
import CountProjects from '../controllers/projectControllers/countProject.js';
import service from '../controllers/projectControllers/services.js';

import uploadProjectImages from '../controllers/projectControllers/uploadProjectImgs.js';
import deleteProjectImg from '../controllers/projectControllers/deleteProjectImg.js';
import getServices from '../controllers/projectControllers/getServices.js';

import postgraphics from '../controllers/projectControllers/postgraphics.js';
import getgraphics from '../controllers/projectControllers/getpgraphics.js';

const projectRoutes = express.Router();

projectRoutes.get('/', getProjects);

projectRoutes.post('/create', CreateProject);

projectRoutes.post('/addProjectType', createProjectType);

projectRoutes.get('/getProjectTypes', getProjectTpe);

projectRoutes.get('/projectCount', CountProjects);

projectRoutes.post('/uploadImage', uploadProjectImages);

projectRoutes.delete('/deleteImage/:filename', deleteProjectImg);

projectRoutes.post('/createService', service);
projectRoutes.get('/getServices', getServices);

projectRoutes.post("/postgraphics", postgraphics);
projectRoutes.get("/getgraphics", getgraphics);

export default projectRoutes;