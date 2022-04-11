import { Document, ObjectId } from 'mongoose';

export default interface IBooking extends Document {
    type: string;
    location: string;
    proposedTime: Array<Date>;
    selectedTime?: Date;
    status: string;
    staff: ObjectId;
    rejectReason?: string;
}