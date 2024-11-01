import { NextFunction, Request, Response } from "express";

function notMatchRoute(_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({ message: "Invalid route", success: false });
}

export default notMatchRoute;
