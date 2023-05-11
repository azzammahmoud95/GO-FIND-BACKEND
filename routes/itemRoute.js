import express from 'express';
import { addItem, getAllItems,getItemByID, editItem, deleteItem} from '../controllers/itemController.js';
import { checkAuth } from '../middleware/auth.js';
import { singleImage } from "../middleware/imageHandler.js";
const router = express.Router();

router.get('/',getAllItems);

router.get('/:id',getItemByID);

router.post('/additem',checkAuth,singleImage ,addItem );

router.put('/edit/:id',checkAuth,singleImage ,editItem);

router.delete('/delete/:id',checkAuth,deleteItem);

export default router;