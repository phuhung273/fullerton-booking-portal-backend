import { Document, ObjectId } from 'mongoose';

interface IPermission extends Document {
    name: string;
    roles?: Array<ObjectId>;
}

export default IPermission;
