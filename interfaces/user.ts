import { Document } from 'mongoose';
import IRole from './role';

export default interface IUser extends Document {
    username: string;
    password: string;
    role?: IRole;
}