import mongoose from "mongoose";
import facultyModel from "../models/faculty.model.js";
import studentModel from "../models/student.model.js";
import loginModel from "../models/login.model.js";
import adminModel from "../models/admin.model.js";
import sendEmailOtp from "../middleware/EmailVarification/sentOtp.js";

// create user login
export const createLogin = async (req, res) => {
  const { userid } = req.params;
  if (!userid || !mongoose.Types.ObjectId.isValid(userid)) {
    return res.status(400).json({ message: "Userid not found" });
  }
  const { email, username, password, id } = req.body;
  if (email && username && password && id) {
    try {
      const checkusername = await loginModel.findOne({ username: username });
      if (checkusername) {
        return res.status(409).json({ message: "Username already exists" });
      }
      let user;
      user = await adminModel.findById(userid);
      if (user) {
        if (email !== user.adminEmail) {
          return res
            .status(404)
            .json({ message: "Please provide a correct email (Admin email)" });
        }

        if (!user.varification) {
          return res.status(403).json({ message: "Email not verified" });
        }
        if (user._id.toString() !== id.toString()) {
          return res.status(403).json({ message: "Invailed user id" });
        }
        const role = "admin";
        const loginUser = new loginModel({
          email: email,
          username: username,
          password: password,
          userId: id,
          role: role,
        });
        const saveUser = await loginUser.save();
        if (saveUser) {
          return res
            .status(200)
            .json({ message: "Create User", Data: saveUser });
        }
      }

      user = await facultyModel.findById(userid);
      if (user) {
        if (email !== user.facultyEmail) {
          return res
            .status(404)
            .json({ message: "Please provide a correct email" });
        }

        if (!user.varification) {
          return res.status(403).json({ message: "Email not verified" });
        }
        if (user._id.toString() !== id.toString()) {
          return res.status(403).json({ message: "Invailed user id" });
        }
        const role = "faculty";
        const loginUser = new loginModel({
          email: email,
          username: username,
          password: password,
          userId: id,
          role: role,
        });
        const saveUser = await loginUser.save();
        if (saveUser) {
          return res
            .status(200)
            .json({ message: "Create User", Data: saveUser });
        }
      }

      user = await studentModel.findById(userid);
      if (user) {
        if (email !== user.studentEmail) {
          return res
            .status(404)
            .json({ message: "Please provide a correct email" });
        }
        if (!user.varification) {
          return res.status(403).json({ message: "Email not verified" });
        }
        if (user._id.toString() !== id.toString()) {
          return res.status(403).json({ message: "Invailed user id" });
        }
        const role = "student";
        const loginUser = new loginModel({
          email: email,
          username: username,
          password: password,
          userId: id,
          role: role,
        });
        const saveUser = await loginUser.save();
        if (saveUser) {
          return res
            .status(200)
            .json({ message: "Create User", Data: saveUser });
        }
      }
      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      return res.status(500).json({ error, message: "Internal error" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
};

// login all type users
export const login = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      const checkUsername = await loginModel.findOne({ username: username });
      if (!checkUsername) {
        return res.status(404).json({ message: "User not found" });
      }
      if (checkUsername.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      return res
        .status(200)
        .json({ message: "Login successful", data: checkUsername });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Internal error(Login Error)" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
};

// Send OTP
let OtpStore = {};
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (email) {
    try {
      const checkMail = await loginModel.findOne({ email: email });
      if (!checkMail) {
        return res.status(404).json({ message: "User not found" });
      }
      const otp = await sendEmailOtp(email);
      OtpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };
      return res
        .status(200)
        .json({ message: "OTP sent successfully", data: { otp } });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Internal error(Send OTP Error)" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (email && otp) {
    try {
      const storeOtpData = OtpStore[email];
      if (!storeOtpData || Date.now() > storeOtpData.expiresAt) {
        return res
          .status(401)
          .json({ message: "OTP not found or OTP expired" });
      }
      if (String(storeOtpData.otp) !== String(otp)) {
        return res.status(401).json({ message: "Incorrect OTP" });
      }
      delete OtpStore[email];
      return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Internal error (Verify OTP Error)" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
};

//Reset Password
export const resetPassword = async (req, res) => {
  const { email, username, newPassword, confirmPassword } = req.body;
  if (!email || !username || !newPassword || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  try {
    const user = await loginModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingUser = await loginModel.findOne({ username });
    if (existingUser && existingUser.email !== email) {
      return res.status(409).json({ message: "Username already exists" });
    }
    const updatedUser = await loginModel.findOneAndUpdate(
      { email },
      { username, password: newPassword },
      { new: true }
    );
    if (updatedUser) {
      return res
        .status(200)
        .json({ message: "Username and Password updated successfully", data: updatedUser});
    } else {
      return res.status(500).json({ message: "Update failed" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal error(Reset Password Error)" });
  }
};
