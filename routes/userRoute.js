import express from 'express';
import { getAllUsers, getUserById, register, login } from '../controllers/userController.js';
import { checkAuth } from '../middleware/auth.js';

const routers = express.Router();

routers.get('/', getAllUsers);

routers.get('/:id', getUserById);

routers.post('/register', register);

routers.post('/login', login);



export default routers;