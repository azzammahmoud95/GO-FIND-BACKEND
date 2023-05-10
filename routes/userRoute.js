import express from 'express';
import { getAllUsers, getUserById, register, login, deleteUserById } from '../controllers/userController.js';
import { checkAuth } from '../middleware/auth.js';

const routers = express.Router();

routers.get('/', getAllUsers);

routers.get('/:id', getUserById);

routers.post('/register', register);

routers.post('/login', login);

routers.delete('/:id',checkAuth, deleteUserById);


export default routers;