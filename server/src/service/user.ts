// internal import
import User from "../model/User";

interface IUser {
  username: string;
  email: string;
  password: string;
}

// get all user
async function findUser() {
  const users = await User.find().exec();
  return users;
}

// get user by property
async function findUserByProperty(key: string, value: string) {
  let user;
  if (key === "_id") {
    user = await User.findById(value).populate("blogs");
  } else {
    user = await User.findOne({ [key]: value }).populate("blogs");
  }

  if (!user) {
    throw new Error("db operation fail");
  }

  return user;
}

// create new user
async function postUser(payload: IUser) {
  const newUser = new User(payload);
  await newUser.save();
  return newUser;
}

// update field by property
async function updateUser(
  key: string,
  value: string,
  field: string,
  payload: string
) {
  if (key === "_id") {
    return await User.findByIdAndUpdate(
      { [key]: value },
      { $set: { [field]: payload } },
      { new: true }
    );
  } else {
    return await User.findOneAndUpdate(
      { [key]: value },
      { $set: { [field]: payload } },
      { new: true }
    );
  }
}

// delete user
async function deleteUser(key: string, value: string) {
  if (key === "_id") {
    return await User.findByIdAndDelete(value);
  } else {
    return await User.findOneAndDelete({ [key]: value });
  }
}

async function addItemToLists(
  key: string,
  userId: string,
  field: string,
  payload: string
) {
  return await User.updateOne(
    { [key]: userId },
    { $push: { [field]: payload } } // adds newItem to the items array
  );
}

async function deleteItemFromLists(
  key: string,
  userId: string,
  field: string,
  payload: string
) {
  console.log();

  return await User.updateOne(
    { [key]: userId },
    { $pull: { [field]: payload } } // adds newItem to the items array
  );
}

// export
export default {
  findUser,
  findUserByProperty,
  postUser,
  addItemToLists,
  deleteItemFromLists,
  updateUser,
  deleteUser,
};
