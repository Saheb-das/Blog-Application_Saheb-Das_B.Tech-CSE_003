// external import
import express, { Router } from "express";

// internal imports
import authController from "../controller/auth";

// create router
const router: Router = express.Router();

// routes

/**
 * @description - sign up
 */
router.post("/register", authController.register);

/**
 * @description - login
 */
router.post("/login", authController.login);

// export
export default router;
