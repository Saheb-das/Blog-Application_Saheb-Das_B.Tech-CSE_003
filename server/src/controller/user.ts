// external import
import { NextFunction, Response, Request } from "express";

//internal import
import userService from "../service/user";
import { customError } from "../utils/customError";
import blogService, { IBlog } from "../service/blog";

// get a single user
async function getUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;

  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      customError("user not found", 400);
    }

    res
      .status(200)
      .json({ message: "User found successfully", success: true, user: user });
  } catch (error) {
    next(error);
  }
}

// get all users
async function getAllUser(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.findUser();
    if (!users) {
      customError("users not found", 400);
    }

    res.status(200).json({
      message: "users found successfully",
      success: true,
      users: users,
    });
  } catch (error) {
    next(error);
  }
}

interface IBlogContent {
  title: string;
  description: string;
  keywords: string[];
}

// create post by user
async function createPostByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.authUser!;
  const blogContent = req.body;

  try {
    const { title, description, keywords }: IBlogContent = blogContent;
    const userId = user._id as string;

    const blogPayload = {
      title: title,
      description: description,
      keywords: [...keywords],
      creator: userId,
    };

    // create a new blog
    const blog = await blogService.postBlog(blogPayload as IBlog);
    if (!blog) {
      customError("blog is not created", 400);
    }

    // set blog id in user
    const updatedUser = await userService.addItemToLists(
      "_id",
      userId,
      "blogs",
      blog._id
    );
    if (!updatedUser) {
      customError("user update fails", 400);
    }

    res.status(200).json({
      message: "blog created successfully",
      success: true,
      blog: blog,
    });
  } catch (error) {
    next(error);
  }
}

interface IModifyBlog {
  id: string;
  title?: string;
  description?: string;
  keywords?: string[];
}

// get all loggedIn user blog lists
async function getAllBlogsInUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.authUser?._id as string;

    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      customError("user not found", 400);
    }

    res.status(200).json({
      message: "blogs get successfully",
      username: user.name,
      blogs: user.blogs,
      success: true,
    });
  } catch (error) {
    next(error);
  }
}

// modify exist blog by user
async function modifyExistBlogByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const blogDetails: IModifyBlog = req.body;

  try {
    const { id, title, description, keywords } = blogDetails;

    const updatedBlogPart = {
      title: title,
      description: description,
      keywords: keywords,
    };

    const updatedBlog = await blogService.updateManyInBlog(
      "_id",
      id,
      updatedBlogPart
    );
    if (!updatedBlog) {
      customError("blog updation failed", 401);
    }

    res.status(200).json({
      message: "Blog updated successfully",
      success: true,
      updatedBlog: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
}

// delete blog by user
async function removeBlogByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { blogId } = req.body;
  const authUser = req.authUser!;

  const userId = authUser._id as string;

  try {
    // remove from users bloglists
    const updatedUser = await userService.deleteItemFromLists(
      "_id",
      userId,
      "blogs",
      blogId
    );
    if (!updatedUser) {
      customError("Item is not deleted", 400);
    }

    // remove blog
    const removedBlog = await blogService.deleteBlog("_id", blogId);
    if (!removedBlog) {
      customError("blog deletation failed");
    }

    res.status(200).json({
      message: "blog deleted successfully",
      success: true,
      deletedBlog: removedBlog,
    });
  } catch (error) {
    next(error);
  }
}

// update user TODO:
function modifyUser(req: Request, res: Response, next: NextFunction) {}

// delete user
async function removeUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;

  try {
    const deletedUser = await userService.deleteUser("_id", userId);
    if (!deletedUser) {
      customError("user not found", 400);
    }

    res.status(200).json({
      message: "User deleted successfully",
      success: true,
      deletedUser: deletedUser,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  getUser,
  getAllUser,
  createPostByUser,
  modifyUser,
  modifyExistBlogByUser,
  removeBlogByUser,
  getAllBlogsInUser,
  removeUser,
};
