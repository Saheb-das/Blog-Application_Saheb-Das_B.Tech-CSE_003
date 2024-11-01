// external import
import { NextFunction, Request, Response } from "express";

// internal import
import { loginSchema, registerSchema } from "../zod/authSchema";
import { comparePassword, hashPassword } from "../lib/passwordHash";
import { generateToken } from "../lib/jwtToken";
import userService from "../service/user";
import { customError } from "../utils/customError";

// sign up
async function register(req: Request, res: Response, next: NextFunction) {
  try {
    // data validation
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      customError(result.error?.errors, 400);
    }

    const userData = result.data!;

    // hash password
    const hashedPassword = await hashPassword(userData.password!, 11);

    // user payload
    const payload = {
      username: userData.name,
      email: userData.email,
      password: hashedPassword!,
    };

    // save data
    const newUser = await userService.postUser(payload);

    // res back
    res.status(200).json({
      message: "user created successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
}

// login
async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      customError(result.error?.errors, 400);
    }

    const userData = result.data!;

    const isExistUser = await userService.findUserByProperty(
      "email",
      userData.email
    );
    if (!isExistUser) {
      // TODO: use custom error
      throw new Error("user not found");
      // res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await comparePassword(
      userData.password,
      isExistUser.password as string
    );
    if (!isValidPassword) {
      // TODO: use custom error
      res.status(400).json({ message: "Invalid credential" });
    }

    const payload = {
      _id: isExistUser._id,
      username: isExistUser.username!,
      email: isExistUser.email!,
    };

    const jwtToken = generateToken(payload!);

    res.status(200).json({
      message: "login successfull",
      success: true,
      user: isExistUser,
      token: jwtToken,
    });
  } catch (error) {
    next(error);
  }
}
function forgotPassword() {}

export default { register, login, forgotPassword };
