import express from 'express';
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.get('/', getAllCategories);

router.get('/:id',getCategoryById);

router.post('/', addCategory);

router.patch('/:id', updateCategory)

router.delete('/:id', deleteCategory);

export default router;