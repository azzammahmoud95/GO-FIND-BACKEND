import express from 'express';
import { addLocation,updateLocation,deleteLocation,getAllLocations,getLocationById, } from "../controllers/locationController.js";
import { checkAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/',getAllLocations);

router.get('/:id',getLocationById);

router.post('/',checkAuth, addLocation);

router.patch('/:id', checkAuth,updateLocation)

router.delete('/:id', checkAuth,deleteLocation);

export default router;