import mongoose, { Schema, Model } from 'mongoose';
import IRole from '../interfaces/role';
import { PERMISSION_SCHEMA_NAME } from './permission';

export const ROLE_SCHEMA_NAME = 'Role';

/**
 * Schema
 */
const RoleSchema = new Schema<IRole, RoleModel>(
    {
        name: { type: String, required: true, unique: true },
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

RoleSchema.virtual('permissions', {
    ref: PERMISSION_SCHEMA_NAME,
    localField: '_id',
    foreignField: 'roles',
    options: {
      select: '_id name',
    }
});

/**
 * Methods
 */


/**
 * Statics
 */
interface RoleModel extends Model<IRole> {
}

/**
 * Register
 */
export default mongoose.model<IRole, RoleModel>(ROLE_SCHEMA_NAME, RoleSchema);