// external import
import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  },
  { timestamps: true }
);

// type of user
type UserType = InferSchemaType<typeof userSchema>;

// model
const User = mongoose.models.User || model<UserType>("User", userSchema);

// export
export default User;
