import express from 'express';
import controller from '../controllers/role';
import { RoleValidation, RoleAssignValidation } from '../middlewares/auth';
import { validateBody } from '../middlewares/validate';

const router = express.Router();

router.post('/', validateBody(RoleValidation), controller.store);
router.post('/assign', validateBody(RoleAssignValidation), controller.assignToUser);

export = router;