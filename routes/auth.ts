import express from 'express';
import controller from '../controllers/auth';
import { RegisterValidation } from '../middlewares/auth';
import { validateBody } from '../middlewares/validate';

const router = express.Router();

router.post('/register', validateBody(RegisterValidation), controller.register);

export = router;