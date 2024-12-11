import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
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
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Process failed: Incomplete data')
  }
  try {
    const user = await User.findOne({ email })
    if (user.isActive === false) return res.status(404).json('User not found 1')
    if (!user) return res.status(404).json('Process failed: User not found')
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json('Process failed: Invalid credentials')
    
    
   
    const payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000), // Fecha de creación del token en segundos
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // Fecha de expiración del token en 7 días
    };

    const token = jwt.encode(payload, process.env.SECRET_KEY);
    return res.status(200).json({ message: 'User logged in', token })
  } catch (error) {
    res.status(500).json('Error Loggin In:', error.message)
  }
};

export {
  register,
  login,
}
