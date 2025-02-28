import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  auth0UserId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  given_name: {
    type: String,
    required: true,
  },
  family_name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
