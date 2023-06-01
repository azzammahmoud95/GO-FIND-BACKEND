import express from 'express';
import { getAllUsers, getUserById, register, login, deleteUserById, editUser } from '../controllers/userController.js';

const routers = express.Router();

routers.get('/', getAllUsers);

routers.get('/:id' ,getUserById);

routers.post('/register', register);

routers.post('/login', login);

routers.delete('/delete/:id', deleteUserById);

routers.patch('/:id' ,editUser)

export default routers;