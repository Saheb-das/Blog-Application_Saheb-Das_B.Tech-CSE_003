import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";

function errorHandler(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log("error stack: ", err.stack); // for development purpose

  res.status(err.statusCode).json({ message: err.message, success: false });
}

// export
export default errorHandler;
