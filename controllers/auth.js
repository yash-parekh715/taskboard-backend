import jwt from 'jsonwebtoken';

export const verifyToken = (req, res) => {
  // Extract token from Authorization header (Bearer token)
  const token = req.headers['authorization']?.split(' ')[1]; // Gets the token after "Bearer"

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If valid, return success with decoded user data
    return res.status(200).json({ message: 'Token is valid', user: decoded });
  } catch (err) {
    // If verification fails (invalid/expired token), return error
    return res.status(403).json({ message: 'Invalid token' });
  }
};
