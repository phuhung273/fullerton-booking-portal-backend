import mongoose, { Schema, Model } from 'mongoose';
import IBooking from '../interfaces/booking';
import { USER_SCHEMA_NAME } from './user';

export const BOOKING_SCHEMA_NAME = 'Booking';

/**
 * Schema
 */
const BookingSchema = new Schema<IBooking, BookingModel>(
    {
        type: { type: String, required: true, },
        location: { type: String, required: true, },
        proposedTime: [{ type: Date }],
        selectedTime: { type: Date },
        status: {
            type: String,
            required: true, 
            enum: ['review', 'approve', 'reject'],
        },
        staff: { type: Schema.Types.ObjectId, ref: USER_SCHEMA_NAME },
        rejectReason: { type: String, },
    },
    {
        timestamps: true
    }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */


/**
 * Statics
 */
interface BookingModel extends Model<IBooking> {
}

BookingSchema.static({
})

/**
 * Register
 */
export default mongoose.model<IBooking, BookingModel>(BOOKING_SCHEMA_NAME, BookingSchema);