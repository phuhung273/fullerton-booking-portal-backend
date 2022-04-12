import { Request, Response } from 'express';
import { sendData, sendError } from '../utils/response';
import Role from '../models/role';
import User from '../models/user';

function store(req: Request, res: Response) {
  const { name } = req.body;

  return Role.create({
    name,
  })
    .then((data) => sendData(res, data))
    .catch((error) => sendError(res, error, error.message, 500));
}

/**
 * Assign a role to a user
 */
async function assignToUser(req: Request, res: Response) {
  const { roleId, userId } = req.body;

  try {
    const data = await User.assignRole(userId, roleId);
    return sendData(res, data);
  } catch (error) {
    if (error instanceof Error) {
      return sendError(res, error, error.message, 500);
    }
    return sendError(res, error, 'Error', 500);
  }
}

export default {
  store,
  assignToUser,
};
