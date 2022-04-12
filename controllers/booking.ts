import { Request, Response } from 'express';
import Booking from '../models/booking';
import User from '../models/user';
import { sendData, sendError } from '../utils/response';

async function index(req: Request, res: Response) {
  const { id } = req.body.jwt;

  // Jwt middleware broken
  if (!id) {
    return sendError(res, null, 'Broken token', 500);
  }

  const user = await User.findById(id).populate('role');
  if (!user) {
    return sendError(res, null, 'User not found', 401);
  } if (!user.role) {
    return sendError(res, null, 'User not set role yet', 401);
  }

  try {
    if (user.role.name === 'staff') {
      const data = await Booking.find({ staff: user._id }).sort({ createdAt: -1 }).lean();
      return sendData(res, data);
    } if (user.role.name === 'admin') {
      const data = await Booking.find().sort({ createdAt: -1 }).lean();
      return sendData(res, data);
    }
    // TODO: not in thoses roles
  } catch (error) {
    return sendError(res, error, 'Error', 500);
  }
}

function store(req: Request, res: Response) {
  const {
    type, location, proposedTimes, user,
  } = req.body;

  const booking = new Booking({
    type,
    location,
    proposedTimes,
    status: 'review',
    staff: user.id,
  });

  const errorValidate = booking.validateSync();
  if (errorValidate) {
    return sendError(res, errorValidate.errors, errorValidate.message, 422);
  }

  return booking.save()
    .then((data) => sendData(res, data))
    .catch((error) => sendError(res, error, error.message, 500));
}

async function remove(req: Request, res: Response) {
  const { id } = req.params;
  const { user } = req.body;

  const booking = await Booking.findById(id);

  if (!booking) {
    return sendError(res, null, `Booking id: ${id} not found`, 422);
  } if (booking.status !== 'review') {
    return sendError(res, null, 'Cannot delete approved/rejected booking');
  } if (booking.staff.toString() !== user.id) {
    return sendError(res, null, 'Booking not belongs to user', 401);
  }

  return booking.delete((error, data) => {
    if (error) {
      return sendError(res, error, error.message, 500);
    }

    return sendData(res, data);
  });
}

async function approve(req: Request, res: Response) {
  const { id } = req.params;
  const selectedIndex: number = req.body.index;

  const booking = await Booking.findById(id);
  const selectedTime = booking?.proposedTimes[selectedIndex];
  if (!booking) {
    return sendError(res, null, `Booking id: ${id} not found`, 422);
  } if (booking.status !== 'review') {
    return sendError(res, null, 'Already approved/rejected', 422);
  } if (!selectedTime) {
    return sendError(res, null, `Invalid index: ${selectedIndex}`, 422);
  }

  booking.selectedTime = selectedTime;
  booking.status = 'approve';

  return booking.save()
    .then((data) => sendData(res, data))
    .catch((error) => sendError(res, error, error.message, 500));
}

async function reject(req: Request, res: Response) {
  const { id } = req.params;
  const { rejectReason } = req.body;

  const booking = await Booking.findById(id);
  if (!booking) {
    return sendError(res, null, `Booking id: ${id} not found`, 422);
  } if (booking.status !== 'review') {
    return sendError(res, null, 'Already approved/rejected', 422);
  }

  booking.rejectReason = rejectReason;
  booking.status = 'reject';

  return booking.save()
    .then((data) => sendData(res, data))
    .catch((error) => sendError(res, error, error.message, 500));
}

export default {
  index,
  store,
  remove,
  approve,
  reject,
};
