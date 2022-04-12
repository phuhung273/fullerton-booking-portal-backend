import { Document, ObjectId } from 'mongoose';

export default interface IBooking extends Document {
    type: string;
    location: string;
    proposedTimes: Array<Date>;
    selectedTime?: Date;
    status: 'review' | 'approve' | 'reject';
    staff: ObjectId;
    rejectReason?: string;
}