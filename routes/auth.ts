import express from 'express';
import controller from '../controllers/auth';
import { AuthValidation } from '../middlewares/requestSchema';
import { validateBody, validateJwt } from '../middlewares/validate';

const router = express.Router();

router.post('/register', validateBody(AuthValidation), controller.register);
router.post('/login', validateBody(AuthValidation), controller.login);
router.get('/handshake', validateJwt, controller.handshake);

export = router;