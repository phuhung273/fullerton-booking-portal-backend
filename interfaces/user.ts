import { Document } from 'mongoose';
import IRole from './role';

interface IUser extends Document {
    username: string;
    password: string;
    role?: IRole;
}

export default IUser;
