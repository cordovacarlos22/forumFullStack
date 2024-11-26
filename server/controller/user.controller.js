import User from "../models/user.model.js";

// ! CRUD OPERATIONS

const getAllUser = async (res, req) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (res, req) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(
      { id: req.params.userId },
      { password: 0 }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Failed to get user ", error: error });
  }
};

const updateUserById = async (res, req) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  const { userId } = req.params.userId
  const updateData = req.body
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true })
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Failed to update user ", error: error });
  }
};

const deleteUserById = async (res, req) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isActive: false }, { new: false} )
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: "Failed to delete user ", error: error })
  }
};

export { getAllUser, getUserById, updateUserById, deleteUserById };
