// external import
import express from "express";

// internal import
import userController from "../controller/user";

// create router
const router = express.Router();

// routes

/**
 * @description - get user
 */
router.get("/:userId", userController.getUser);

/**
 * @description - get all user
 */
router.get("/", userController.getAllUser);

/**
 * @description - create a new blog by user
 */
router.post("/create-blog", userController.createPostByUser);

/**
 * @description - update exist blog by user
 */
router.post("/update-blog", userController.modifyExistBlogByUser);

/**
 * @description - delete blog from user
 */
router.delete("/delete-blog", userController.removeBlogByUser);

router.get("/blogs", userController.getAllBlogsInUser);

/**
 * @description - update user
 */
router.patch("/:userId", userController.modifyUser);

/**
 * @description - delete user
 */
router.delete("/:userId", userController.removeUser);

// export
export default router;
