import vehicleController from '../controller/vehicleController';
import { Router } from 'express';

const router = Router();

router.get('/vehicle/:id', vehicleController.getVehicle);
router.delete('/vehicle/delete/:id', vehicleController.deleteVehicle);
router.get('/vehicle/getAll', vehicleController.getAll);
router.put('/vehicle/update/:id',vehicleController.updateVehicle);
router.post('/vehicle/create',vehicleController.createVehicle);

export default router;