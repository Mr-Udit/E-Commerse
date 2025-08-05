import User from '../models/User.js';
import { generateJWT, generateVerificationToken, generateResetToken } from '../utils/generateToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Email already exists' });
  // validate role set defalt to 'user' if not provided
  if (!role) {
    req.body.role = 'user';
  }
  const validRoles = ['admin', 'user'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }
  const user = await User.create({ name, email, password, role });
  const token = generateVerificationToken(user._id);
  user.verificationToken = token;
  user.verificationTokenExpires = Date.now() + 3600000;
  await user.save();

  const verifyURL = `${process.env.CLIENT_URL}/api/auth/verify-email?token=${token}`;
  const message = `<p>Click here to verify your email: <a href="${verifyURL}">Verify</a></p>`;
  await sendEmail(email, 'Verify your email', message);

  res.status(201).json({ message: 'User registered. Check your email.' });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verified) return res.status(400).json({ message: 'Invalid credentials or not verified' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateJWT(user._id);
  res.status(200).json({ token });
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.verified) return res.status(400).json({ message: 'Invalid or already verified' });

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch {
    res.status(400).json({ message: 'Token expired or invalid' });
  }
};

export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.verified) return res.status(404).json({ message: 'User not found or already verified' });

  const token = generateVerificationToken(user._id);
  user.verificationToken = token;
  user.verificationTokenExpires = Date.now() + 3600000;
  await user.save();

  const verifyURL = `${process.env.CLIENT_URL}/api/auth/verify-email?token=${token}`;
  const message = `<p>Click here to verify your email: <a href="${verifyURL}">Verify</a></p>`;
  await sendEmail(email, 'Verify your email (Resent)', message);
  res.status(200).json({ message: 'Verification email resent' });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = generateResetToken(user._id);
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  const message = `<p>Click here to reset your password: <a href="${resetURL}">Reset</a></p>`;
  await sendEmail(email, 'Reset your password', message);

  res.status(200).json({ message: 'Password reset email sent' });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.resetPasswordToken !== token || Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch {
    res.status(400).json({ message: 'Token error' });
  }
};