// external import
import express from "express";

// internal import
import userRouter from "../routes/user";
import blogRouter from "../routes/blog";
import authRouter from "../routes/auth";
import { isAuthenticate } from "../middleware/authenticate";

// router
const router = express.Router();

// routes
router.use("/auth", authRouter);
router.use("/users", isAuthenticate, userRouter);
router.use("/blogs", blogRouter);

// export
export default router;
