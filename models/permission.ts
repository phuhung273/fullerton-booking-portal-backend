import mongoose, { Schema, Model } from 'mongoose';
import IPermission from '../interfaces/permission';
import Role, { ROLE_SCHEMA_NAME } from './role';

const PERMISSION_SCHEMA_NAME = 'Permission';

/**
 * Schema
 */
const PermissionSchema = new Schema<IPermission, PermissionModel>(
    {
        name: { type: String, required: true, unique: true },
        roles: [{ type: Schema.Types.ObjectId, ref: ROLE_SCHEMA_NAME }]
    },
    {
        timestamps: true
    }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */


/**
 * Statics
 */
interface PermissionModel extends Model<IPermission> {
    addRole(id: string, roleId: string): PermissionModel;
}

PermissionSchema.static({
    addRole: async function(id: string, roleId: string){
        const role = await Role.findById(roleId);
        if(!role){
            throw new Error("Role not found");
        }

        const data = await this.findByIdAndUpdate(id, {
            $addToSet: { roles: role._id, }
        });
        if(!data){
            throw new Error("Permission not found");
        }

        return data;
    }
})

/**
 * Register
 */
export default mongoose.model<IPermission, PermissionModel>(PERMISSION_SCHEMA_NAME, PermissionSchema);

export {
    PERMISSION_SCHEMA_NAME,
}