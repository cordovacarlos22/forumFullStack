import jwt from 'jwt-simple';

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Split the header into Bearer and the token
  const [bearer, token] = authHeader.split(' ');

  // Validate the format of the Authorization header
  if (bearer !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid authorization header format' });
  }

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // Decode the token using the secret key
    const payload = jwt.decode(token, process.env.SECRET_KEY);

    // Check if the token has expired
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp <= now) {
      return res.status(401).json({ message: 'Token expired' });
    }

    // Add user information from the token to the request object
    req.role = payload.role; // The user's role
    req.userId = payload._id; // The user's ID

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token validation error:', error.message); // Log the error for debugging
    res.status(401).json({ message: 'Invalid or malformed token' });
  }
};

export { isAuth };