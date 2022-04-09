
import Joi from 'joi';
import IUser from '../interfaces/user';
import IRole from '../interfaces/role';
import IPermission from '../interfaces/permission';

const RegisterValidation = Joi.object<IUser>({
    username: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(3).max(15).required(),
});

const RoleValidation = Joi.object<IRole>({
    name: Joi.string().min(3).max(15).required(),
});

const RoleAssignValidation = Joi.object({
    roleId: Joi.string().required(),
    userId: Joi.string().required(),
});

const PermissionValidation = Joi.object<IPermission>({
    name: Joi.string().min(3).max(15).required(),
});

export {
    RegisterValidation,
    RoleValidation,
    RoleAssignValidation,
    PermissionValidation,
}