import express from 'express';
import { addLocation,updateLocation,deleteLocation,getAllLocations,getLocationById, } from "../controllers/locationController.js";
import { checkAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/',getAllLocations);

router.get('/:id',getLocationById);

router.post('/', addLocation);

router.patch('/:id',updateLocation)

router.delete('/:id',deleteLocation);

export default router;