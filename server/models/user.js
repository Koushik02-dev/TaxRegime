// models/User.js
import mongoose from 'mongoose';
import { Schema } from 'mongoose'
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  password: { type: String, required: true }
},
{
  timestamps: true
});


userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', userSchema);

export default User;

