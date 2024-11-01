// external import
import mongoose, { InferSchemaType, Schema, model } from "mongoose";

// create blog schema
const blogSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    keywords: [
      {
        type: String,
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// type of user
type BlogType = InferSchemaType<typeof blogSchema>;

// model
const Blog = mongoose.models.Blog || model<BlogType>("Blog", blogSchema);

// export
export default Blog;
