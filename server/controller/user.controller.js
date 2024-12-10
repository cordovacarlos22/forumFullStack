import bcrypt from "bcrypt";
import User from "../models/user.model.js";

// ! CRUD OPERATIONS

const getAllUser = async (req, res) => {
  try {
    let users;
    if (req.role === "admin") {
      users = await User.find();
    } else {
      users = await User.find({}, { firstName: 1, lastName: 1, avatar: 1 });
    }

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users were found!" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "Failed to get users ", error: error });
  }
};

const getUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    let user;
    if (req.role === "admin") {
      user = await User.findById(req.params.userId, { password: 0 });
    } else {
      user = await User.findById(req.params.userId, {
        _id: 1,
        firstName: 1,
        lastName: 1,
        avatar: 1,
        bio: 1,
      });
    }
    return res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: "Failed to get user ", error: error });
  }
};

const updateUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Failed to update user ", error: error });
  }
};

const updateUserPassword = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const { CurrentPassword, NewPassword } = req.body;
  if (!CurrentPassword || !NewPassword) {
    return res.status(400).json({ message: "Both passwords are required" });
  }
  
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const validatedPassword = await bcrypt.compare(
      req.body.CurrentPassword,
      user.password
    );
    if (!validatedPassword)
      return res.status(400).json({ message: "Incorrect password" });

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.NewPassword, salt)

    user.password = hashedPassword

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to update user ", error: error });
  }
};

const deleteUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const validatedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatedPassword)
      return res.status(400).json({ message: "Incorrect password" });

    user.isActive = false;
    await user.save();

    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: "Failed to delete user ", error: error });
  }
};

export {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  updateUserPassword,
};
