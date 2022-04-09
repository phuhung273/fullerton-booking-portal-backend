import mongoose, { Schema } from 'mongoose';
import IPermission from '../interfaces/permission';
import { ROLE_SCHEMA_NAME } from './role';

const PERMISSION_SCHEMA_NAME = 'Permission';

/**
 * Schema
 */
const PermissionSchema = new Schema(
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


/**
 * Register
 */
export default mongoose.model<IPermission>(PERMISSION_SCHEMA_NAME, PermissionSchema);

export {
    PERMISSION_SCHEMA_NAME,
}