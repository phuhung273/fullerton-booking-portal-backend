import { Document, ObjectId } from 'mongoose';

interface IBooking extends Document {
    type: string;
    location: string;
    proposedTimes: Array<Date>;
    selectedTime?: Date;
    status: 'review' | 'approve' | 'reject';
    staff: ObjectId;
    rejectReason?: string;
}

export default IBooking;
