
import Joi from 'joi';
import IUser from '../interfaces/user';
import IRole from '../interfaces/role';
import IPermission from '../interfaces/permission';

const RegisterValidation = Joi.object<IUser>({
    username: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(3).max(15).required(),
});

const UserAssignRoleValidation = Joi.object({
    userId: Joi.string().required(),
    roleId: Joi.string().required(),
});

const RoleValidation = Joi.object<IRole>({
    name: Joi.string().min(3).max(15).required(),
});

const PermissionAddRoleValidation = Joi.object({
    permissionId: Joi.string().required(),
    roleId: Joi.string().required(),
});

const PermissionValidation = Joi.object<IPermission>({
    name: Joi.string().min(3).max(15).required(),
});

export {
    RegisterValidation,
    UserAssignRoleValidation,
    RoleValidation,
    PermissionValidation,
    PermissionAddRoleValidation
}