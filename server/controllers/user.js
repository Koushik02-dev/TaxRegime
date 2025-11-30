// controllers/userController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Tax from "../models/tax.js";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  httpOnly: true,
  secure: true,
};

const register = async (req, res) => {
  try {
    const { userId, userName, email, contactNo, password } = req.body;
    let user = await User.findOne({ userId });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({
      userId,
      userName,
      email,
      contactNo,
      password: await bcrypt.hash(password, 10),
    });
    await user.save();
    user.password = undefined;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, cookieOptions);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  try {
    const { userId, password } = req.body;
    let user = await User.findOne({ userId });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, cookieOptions);
    user.password = undefined;

    res.json({ success: true, msg: "Logged in successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};



const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "LogOut successful",
    });
};


const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const id = req.user._id; // Ensure req.user is populated correctly

    const user = await User.findById(id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Old Password does not match",
      });
    }

    // Update user password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Optionally, reissue token after password change
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};


const taxForm = async (req, res) => {
  try {
    // Extract fields from request body
    const { pno, name, level, switchOption, enclosedDocs, financialYear } =
      req.body;

    // Create a new Tax instance
    const newTax = new Tax({
      pno,
      name,
      level,
      switchOption,
      enclosedDocs,
      financialYear,
    });

    // Save the new Tax instance to the database
    const savedTax = await newTax.save();

    res.status(201).json({
      success: true,
      message: "form submitted successfully",
      savedTax,
    }); // Respond with the saved tax record
  } catch (error) {
    console.error("Error saving tax record:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getTaxReports = async (req, res) => {
  const { fromDate, toDate } = req.query;
  try {
    // Parse the dates from string to Date objects
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    // Find reports within the specified date range
    const reports = await Tax.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).select("pno name level createdAt switchOption");

    if (!reports) {
      return res.status(404).json({ success: false, msg: "No reports found" });
    }

    res.json({
      success: true,
      message: "Reports fetched successfully",
      reports,
    });
  } catch (error) {
    console.error("Error fetching tax reports:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export { register, login, logout, taxForm, getTaxReports, changePassword };
