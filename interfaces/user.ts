import { Document, ObjectId } from 'mongoose';

export default interface IUser extends Document {
    username: string;
    password: string;
    role?: ObjectId;
}