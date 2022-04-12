import express from 'express';
import controller from '../controllers/booking';
import { validateJwt, validateRole } from '../middlewares/validate';

const router = express.Router();

router.get('/', validateJwt, controller.index);
router.post('/', validateRole(['staff']), controller.store);
router.delete('/:id', validateRole(['staff']), controller.remove);
router.post('/:id/approve', validateRole(['admin']), controller.approve);
router.post('/:id/reject', validateRole(['admin']), controller.reject);

export = router;