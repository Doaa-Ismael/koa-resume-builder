import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (e) {
    next(e);
  }
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ data: this }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  const isMatching = await bcrypt.compare(password, this.password);
  return isMatching;
};

const User = mongoose.model("User", userSchema);

export default User;
