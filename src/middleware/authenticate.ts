// extwenal import
import { Request, Response, NextFunction } from "express";

// internal import
import { verifyToken } from "../lib/jwtToken";
import userService from "../service/user";
import { customError } from "../utils/customError";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      userId?: Types.ObjectId; // Use the correct type for your `user` object
    }
  }
}

async function isAuthenticate(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization;

  try {
    if (!token) {
      return next(customError("token not found", 401));
    }

    token = token.split(" ")[1];

    const userPayload = verifyToken(token!);

    if (!userPayload || Types.ObjectId.isValid(userPayload.id)) {
      res
        .status(400)
        .json({ message: "Invalid token payload", success: false });
    }

    const user = await userService.findUserById(userPayload._id);
    if (!user) {
      res.status(400).json({ message: "Invalid user", success: false });
    }

    // user find
    req.userId = user._id.toString();

    next();
  } catch (error) {
    next(error);
  }
}

export { isAuthenticate };
