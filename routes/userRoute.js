import express from 'express';
import { getAllUsers, getUserById, register } from '../controllers/userController.js';


const routers = express.Router();

routers.get('/', getAllUsers);

routers.get('/:id', getUserById);

routers.post('/', register);

export default routers;