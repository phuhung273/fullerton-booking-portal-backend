import mongoose, { Schema, Model } from 'mongoose';
import IRole from '../interfaces/role';

const ROLE_SCHEMA_NAME = 'Role';

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

export {
    ROLE_SCHEMA_NAME
}