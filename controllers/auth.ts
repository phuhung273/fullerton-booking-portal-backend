import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendData, sendError } from '../utils/response';
import User from '../models/user';
import config from '../config/config';

function signJwt(payload: string | object | Buffer, callback: jwt.SignCallback) {
  return jwt.sign(
    payload,
    config.server.token.secret,
    {
      algorithm: 'HS256',
      expiresIn: config.server.token.expireTime,
    },
    callback,
  );
}

async function register(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    return sendError(res, null, 'User existed');
  }

  bcrypt.hash(password, 10, (error, hash) => {
    if (error) {
      return sendError(res, error, error.message, 500);
    }

    const newUser = new User({
      username,
      password: hash,
    });

    return newUser.save()
      .then((data) => sendData(res, data))
      .catch((error1) => sendError(res, error1, error1.message, 500));
  });
}

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await User.findOne({ username })
    .populate({
      path: 'role',
      select: '_id name',
      populate: {
        path: 'permissions',
      },
    })
    .lean();

  if (!user) {
    return sendError(res, null, 'User not found');
  }

  bcrypt.compare(password, user.password, (error, result) => {
    if (error) {
      return sendError(res, error, error.message, 500);
    } if (result) {
      signJwt(
        {
          id: user._id,
          username: user.username,
        },
        (error1, token) => {
          if (error1) {
            return sendError(res, error1, error1.message, 500);
          }

          return sendData(res, {
            id: user._id,
            username,
            role: user.role,
            token,
          });
        },
      );
    } else {
      return sendError(res, null, 'Invalid Credentials');
    }
  });
}

async function handshake(req: Request, res: Response) {
  const { id } = req.body.jwt;

  const user = await User.findById(id)
    .populate({
      path: 'role',
      select: '_id name',
      populate: {
        path: 'permissions',
      },
    })
    .lean();

  if (!user) {
    return sendError(res, null, 'User not found', 500);
  }

  signJwt(
    {
      id: user._id,
      username: user.username,
    },
    (error, token) => {
      if (error) {
        return sendError(res, error, error.message, 500);
      }

      return sendData(res, {
        id: user._id,
        username: user.username,
        role: user.role,
        token,
      });
    },
  );
}

export default {
  register,
  login,
  handshake,
};
