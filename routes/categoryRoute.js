import express from 'express';
import { addCategory, getAllCategories, getCategoryById } from "../controllers/categoryController.js";

const router = express.Router();

router.get('/', getAllCategories);

router.get('/:id',getCategoryById);

router.post('/', addCategory);

export default router;