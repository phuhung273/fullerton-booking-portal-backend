import express from 'express';
import controller from '../controllers/booking';
import { validateJwt, validateRole } from '../middlewares/validate';

const router = express.Router();

router.get('/', validateJwt, controller.index);
router.post('/', validateRole(['staff']), controller.store);
router.post('/approve', validateRole(['admin']), controller.approve);
router.post('/reject', validateRole(['admin']), controller.reject);

export = router;