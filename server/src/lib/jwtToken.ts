// external import
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { customError } from "../utils/customError";

export interface ITokenPayload extends JwtPayload {
  _id: Types.ObjectId;
  username: string;
  email: string;
}

// generate token
function generateToken(payload: ITokenPayload) {
  return `Bearer ${jwt.sign(payload, process.env.JWT_SECRET_KEY!)}`;
}

// verify token
function verifyToken(token: string): ITokenPayload {
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY!);

  if (typeof decode === "string") {
    customError("Invalid token as string");
  }

  return decode as ITokenPayload;
}

export { generateToken, verifyToken };
