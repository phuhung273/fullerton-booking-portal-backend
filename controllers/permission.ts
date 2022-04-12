import { Request, Response } from 'express';
import { sendData, sendError } from '../utils/response';
import Permission from '../models/permission';

function store(req: Request, res: Response) {
  const { name } = req.body;

  return Permission.create({
    name,
  })
    .then((data) => sendData(res, data))
    .catch((error) => sendError(res, error, error.message, 500));
}

/**
 * Add a role to a permission
 */
async function addRole(req: Request, res: Response) {
  const { roleId, permissionId } = req.body;

  try {
    const data = await Permission.addRole(permissionId, roleId);
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
  addRole,
};
