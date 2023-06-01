import express from 'express';
import { addItem, getAllItems,getItemByID, editItem,editIsFound, deleteItem} from '../controllers/itemController.js';
import { checkAuth } from '../middleware/auth.js';
// import { singleImage } from "../middleware/imageHandler.js";
const router = express.Router();

router.get('/',getAllItems);

router.get('/:id',getItemByID);

router.post('/additem' ,addItem );

router.patch('/edit/:id' ,editItem);

router.put('/isfound/:id',editIsFound)

router.delete('/delete/:id',deleteItem);

export default router;