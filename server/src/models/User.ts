import mongoose, { Schema } from "mongoose";

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
  isVerified: boolean;
  verifyAccountToken: string | null;
  expiryVerifyAccountToken: Date | null;
  recoverPWdToken: string | null;
  expiryRecoverPwdToken: Date | null;
  hasSubscribedToNewsletter: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    acceptedTerms: {
      type: Boolean,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyAccountToken: {
      type: String,
      default: null,
    },
    expiryVerifyAccountToken: {
      type: Date,
      default: null,
    },
    recoverPwdToken: {
      type: String,
      default: null,
    },
    expiryRecoverPwdToken: {
      type: Date,
      default: null,
    },
    hasSubscribedToNewsletter: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
