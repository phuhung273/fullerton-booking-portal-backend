import express from 'express';
import controller from '../controllers/booking';
import { validateRole } from '../middlewares/validate';

const router = express.Router();

router.post('/', validateRole(['staff']), controller.store);

export = router;