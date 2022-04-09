import { Document, ObjectId } from 'mongoose';

export default interface IRole extends Document {
    _id: ObjectId,
    name: string;
}