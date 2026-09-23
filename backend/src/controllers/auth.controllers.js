import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otp.js";
import { sendEmail } from "../utils/email.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "userName or Email already exists",
      });
    }
    const otp = generateOTP();

    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
   
    const hashedPassword = await bcrypt.hash(password, 10);

   const user = await User.create({
     username,
     email,
     password: hashedPassword,
     fullName,
     emailVerificationOtp: otp,
     emailVerificationExpires: otpExpires,
   });

   await sendEmail({
     to: user.email,
     subject: "Verify your AURA account",
     text: `Your AURA verification OTP is ${otp}. This OTP will expire in 10 minutes.`,
   });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("registration Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while registering",
    });
  }
};
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    if (user.emailVerificationOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (
      !user.emailVerificationExpires ||
      user.emailVerificationExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationOtp = null;
    user.emailVerificationExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("❌ OTP verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying OTP",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const accesssToken = jwt.sign({ id: user._id ,
      role:user.role
    }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        accessToken: accesssToken,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in",
    });
  }
};
export const makeAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = "admin";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User promoted to admin",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Make admin error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
