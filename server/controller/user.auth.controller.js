import User from "../models/user.model";
import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';

// Register a new user
const register = async (req, res) => {

  // validate that user provides wiht the required information 
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json('Process failed: Incomplete data')
  }

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json('Process failed: Email already exists')

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    req.body.password = hashedPassword;



    const newUser = await User.create(req.body); // create new user in db 

    newUser.password = undefined

    return res.status(201).json({ message: 'User registered', newUser })

  } catch (error) {
    res.status(500).json('Error Creating User:', error.message)
  }
};

// login user 

const login = async (req, res) => {
  try {

  } catch (error) {

  }
}

export {
  register,
  login,
}
