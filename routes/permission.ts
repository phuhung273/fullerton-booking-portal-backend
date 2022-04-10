import express from 'express';
import controller from '../controllers/permission';
import { PermissionAddRoleValidation, PermissionValidation } from '../middlewares/auth';
import { validateBody } from '../middlewares/validate';

const router = express.Router();

router.post('/', validateBody(PermissionValidation), controller.store);
router.post('/addRole', validateBody(PermissionAddRoleValidation), controller.addRole);

export = router;