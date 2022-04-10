import { Document, ObjectId } from 'mongoose';

export default interface IPermission extends Document {
    name: string;
    roles?: Array<ObjectId>;
}