// extwenal import
import { Request, Response, NextFunction } from "express";

// internal import
import { verifyToken } from "../lib/jwtToken";
import userService from "../service/user";
import { Document } from "mongoose";
import { customError } from "../utils/customError";

declare global {
  namespace Express {
    interface Request {
      authUser?: Document; // Use the correct type for your `user` object
    }
  }
}

async function isAuthenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    // decode token
    if (!token) {
      customError("token not provided", 401);
    }

    const userPayload = verifyToken(token!);

    const user = await userService.findUserByProperty(
      "_id",
      userPayload._id.toString()
    );
    if (!user) {
      res.status(400).json({ message: "Invalid user", success: false });
    }

    // user find
    req.authUser = user;

    next();
  } catch (error) {
    next(error);
  }
}

export { isAuthenticate };
