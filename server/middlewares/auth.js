import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    console.log('Cookies:', req.cookies); // Debugging line
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "You are not Logged In, Please login first",
      });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Data:', decodedData); // Debugging line
    req.user = await User.findById(decodedData._id);
    if (!req.user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default isAuthenticated;
