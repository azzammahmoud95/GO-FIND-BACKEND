import express from 'express';
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/categoryController.js";
import { checkAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/',getAllCategories);

router.get('/:id',getCategoryById);

router.post('/',checkAuth, addCategory);

router.patch('/:id', checkAuth,updateCategory)

router.delete('/:id', checkAuth,deleteCategory);

export default router;