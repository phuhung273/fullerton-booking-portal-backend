import { Document } from 'mongoose';

interface IRole extends Document {
    name: string;
}

export default IRole;
