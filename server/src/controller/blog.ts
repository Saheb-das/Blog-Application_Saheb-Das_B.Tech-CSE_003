// external import
import { NextFunction, Response, Request } from "express";

// internal import
import blogService from "../service/blog";
import { customError } from "../utils/customError";

// get single blog
async function getBlog(req: Request, res: Response, next: NextFunction) {
  const { blogId } = req.params;
  try {
    const blog = await blogService.findBlogByProperty("_id", blogId);
    if (!blog) {
      customError("blog not found", 400);
    }

    res
      .status(200)
      .json({ message: "blog gets successfully", success: true, blog: blog });
  } catch (error) {
    next(error);
  }
}

// get all blogs
async function getAllBlog(_req: Request, res: Response, next: NextFunction) {
  try {
    const blogs = await blogService.findBlog();
    if (!blogs) {
      customError("Blog are not found", 400);
    }

    res
      .status(200)
      .json({ message: "blogs get successfully", success: true, blogs: blogs });
  } catch (error) {
    next(error);
  }
}

// create new blog
function createBlog(req: Request, res: Response, next: NextFunction) {
  // TODO: after creating client
}

// update a blog
async function modifyBlog(req: Request, res: Response, next: NextFunction) {
  const { blogId } = req.params;
  const payload: string = req.body;

  try {
    const blog = await blogService.updateBlog(
      "_id",
      blogId,
      "description",
      payload
    );
    if (!blog) {
      customError("blog not found", 400);
    }

    res.status(200).json({
      message: "Blogupdated succesfully",
      success: true,
      updatedBlog: blog,
    });
  } catch (error) {
    next(error);
  }
}

// delete a blog
async function removeBlog(req: Request, res: Response, next: NextFunction) {
  const { blogId } = req.params;

  try {
    const blog = await blogService.deleteBlog("_id", blogId);
    if (!blog) {
      customError("blog not found", 400);
    }

    res.status(200).json({
      message: "Blog deleted succesfull",
      success: true,
      deletedBlog: blog,
    });
  } catch (error) {
    next(error);
  }
}

// export
export default { getBlog, getAllBlog, createBlog, modifyBlog, removeBlog };
