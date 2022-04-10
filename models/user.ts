import mongoose, { Schema, Model } from 'mongoose';
import IUser from '../interfaces/user';
import Role, { ROLE_SCHEMA_NAME } from './role';

const USER_SCHEMA_NAME = 'User';

/**
 * Schema
 */
const UserSchema = new Schema<IUser, UserModel>(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: Schema.Types.ObjectId, ref: ROLE_SCHEMA_NAME }
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
interface UserModel extends Model<IUser> {
    assignRole(id: string, roleId: string): UserModel;
}

UserSchema.static({
    assignRole: async function(id: string, roleId: string){
        const role = await Role.findById(roleId);
        if(!role){
            throw new Error("Role not found");
        }

        const data = await this.findByIdAndUpdate(id, {
            role: role._id,
        });
        if(!data){
            throw new Error("User not found");
        }

        return data;
    }
})

/**
 * Register
 */
export default mongoose.model<IUser, UserModel>(USER_SCHEMA_NAME, UserSchema);

export {
    USER_SCHEMA_NAME
}