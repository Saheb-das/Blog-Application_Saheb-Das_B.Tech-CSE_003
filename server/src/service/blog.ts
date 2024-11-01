// internal import
import Blog from "../model/Blog";

// get all blogs
async function findBlog() {
  const blogs = await Blog.find().exec();
  return blogs;
}

// get blog by property
async function findBlogByProperty(key: string, value: string) {
  if (key === "_id") {
    return await Blog.findById(value);
  } else {
    return await Blog.findOne({ [key]: value });
  }
}

export interface IBlog {
  title: string;
  description: string;
  keywords: string[];
  creator: string;
}

// create new blog
async function postBlog(payload: IBlog) {
  const newBlog = new Blog(payload);
  await newBlog.save();
  return newBlog;
}

// update single property of blog
async function updateBlog(
  key: string,
  value: string,
  field: string,
  payload: string
) {
  if (key === "_id") {
    return await Blog.findByIdAndUpdate(
      { [key]: value },
      { $set: { [field]: payload } },
      { new: true }
    );
  } else {
    return await Blog.findOneAndUpdate(
      { [key]: value },
      { $set: { [field]: payload } },
      { new: true }
    );
  }
}

// update blog of more than one properties of a blog
async function updateManyInBlog(
  key: string,
  value: string,
  updatedObj: Record<string, any>
) {
  if (key === "_id") {
    return await Blog.findByIdAndUpdate(
      { [key]: value },
      { $set: updatedObj },
      { new: true }
    );
  } else {
    return await Blog.findOneAndUpdate(
      { [key]: value },
      { $set: updatedObj },
      { new: true }
    );
  }
}

// delete blog by property
async function deleteBlog(key: string, value: string) {
  if (key === "_id") {
    return await Blog.findByIdAndDelete(value).exec();
  } else {
    return await Blog.findOneAndDelete({ [key]: value }).exec();
  }
}

// export
export default {
  findBlog,
  findBlogByProperty,
  postBlog,
  updateBlog,
  updateManyInBlog,
  deleteBlog,
};
