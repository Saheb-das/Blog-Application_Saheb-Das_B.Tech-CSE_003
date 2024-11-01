// external import
import express from "express";

// internal import
import blogController from "../controller/blog";
import { isAuthenticate } from "../middleware/authenticate";

// create router
const router = express.Router();

// routes

/**
 * @description - get blog by Id
 */
router.get("/:blogId", blogController.getBlog);

/**
 * @description - get all blog
 */
router.get("/", blogController.getAllBlog);

/**
 * @description - create new blog
 */
router.post("/", isAuthenticate, blogController.createBlog);

/**
 * @description - update blog
 */
router.patch("/:blogId", isAuthenticate, blogController.modifyBlog);

/**
 * @description - delete blog
 */
router.delete("/:blogId", isAuthenticate, blogController.removeBlog);

// export
export default router;
