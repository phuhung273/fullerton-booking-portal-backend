import express from 'express';
import controller from '../controllers/permission';
import { PermissionValidation } from '../middlewares/auth';
import { validateBody } from '../middlewares/validate';

const router = express.Router();

router.post('/', validateBody(PermissionValidation), controller.store);

export = router;