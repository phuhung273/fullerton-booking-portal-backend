import { Document, ObjectId } from 'mongoose';

export default interface IPermission extends Document {
    _id: ObjectId,
    name: string;
    roles: Array<ObjectId>;
}