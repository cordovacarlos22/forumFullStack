import User from "../models/user.model";


// ! CRUD OPERATIONS 

const getAllUser = async (res, req) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getUserById = async (res, req) => {
  

};

const createUser = async (res, req) => {

};

const updateUser = async (res, req) => {

};

const deleteUser = async (res, req) => {

};



export {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}