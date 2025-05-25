import express from 'express';
import CreateProject from '../controllers/projectControllers/createprojects.js';
import getProjects from '../controllers/projectControllers/getProjects.js';
import createProjectType from '../controllers/projectControllers/createProjectType.js';
import getProjectTpe from '../controllers/projectControllers/getProjectTypes.js';
import CountProjects from '../controllers/projectControllers/countProject.js';

import uploadProjectImages from '../controllers/projectControllers/uploadProjectImgs.js';
import deleteProjectImg from '../controllers/projectControllers/deleteProjectImg.js';

const projectRoutes = express.Router();

projectRoutes.get('/', getProjects);

projectRoutes.post('/create', CreateProject);

projectRoutes.post('/addProjectType', createProjectType);

projectRoutes.get('/getProjectTypes', getProjectTpe);

projectRoutes.get('/projectCount', CountProjects);

projectRoutes.post('/uploadImage', uploadProjectImages);

projectRoutes.delete('/deleteImage/:filename', deleteProjectImg)

export default projectRoutes;