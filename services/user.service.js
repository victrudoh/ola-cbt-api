// Models
const userModel = require("../models/user.model");
const testModel = require("../models/test.model");

// All
exports.allUsersService = async () => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// One
exports.oneUserService = async (id) => {
  try {
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return { error: new Error("Error: User not found") };
    }
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// All students
exports.allStudentsService = async () => {
  try {
    const users = await userModel.find({ role: "user" });
    return users;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Add
exports.addUserService = async (details) => {
  try {
    const findUser = await userModel.findOne({ name: details.name });
    if (findUser) {
      return { error: new Error("Error: User already exists") };
    }

    // create user
    const user = new userModel(details);
    await user.save();
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Edit
exports.editUserService = async (details, id) => {
  try {
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return { error: new Error("Error: User not found") };
    }

    user.name = details.name;
    await user.save();
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// Delete
exports.deleteUserService = async (id) => {
  try {
    const user = await userModel.findByIdAndRemove({ _id: id });
    if (!user) {
      return { error: new Error("Error: User not found") };
    }
    return user;
  } catch (error) {
    return { error: new Error(error) };
  }
};

// one user tests
exports.oneUserTestsService = async (id) => {
  try {
    const user = await userModel.findById({ _id: id });
    const tests = await testModel.find({ userId: id });
    if (!user) {
      return { error: new Error("Error: User not found") };
    }
    return tests;
  } catch (error) {
    return { error: new Error(error) };
  }
};
