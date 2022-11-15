import gestorController from '../controller/gestorController';
import { Router } from 'express';

const router = Router();

router.get('/gestor/:id', gestorController.getGestor);
router.delete('/gestor/delete/:id', gestorController.deleteGestor);
router.get('/gestor/getAll', gestorController.getAll);
router.put('/gestor/update/:id',gestorController.updateGestor);
router.post('/gestor/add',gestorController.addGestor);

export default router;