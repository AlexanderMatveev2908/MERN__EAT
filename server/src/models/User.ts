import mongoose, { Schema } from "mongoose";

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: {
    country: string | null;
    state: string | null;
    city: string | null;
    street: string | null;
    zipCode: string | null;
    phone: string | null;
  };
  acceptedTerms: boolean;
  isVerified: boolean;
  refreshToken: string | null;
  expiryRefreshToken: Date | null;
  verifyAccountToken: string | null;
  expiryVerifyAccountToken: Date | null;
  recoverPwdToken: string | null;
  expiryRecoverPwdToken: Date | null;
  hasSubscribedToNewsletter: boolean;
  hashedTokenToUnsubscribeNewsLetter: string | null;
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
    address: {
      country: {
        type: String,
        default: null,
      },
      state: {
        type: String,
        default: null,
      },
      city: {
        type: String,
        default: null,
      },
      street: {
        type: String,
        default: null,
      },
      zipCode: {
        type: String,
        default: null,
      },
      phone: {
        type: String,
        default: null,
      },
    },
    acceptedTerms: {
      type: Boolean,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    expiryRefreshToken: {
      type: Date,
      default: null,
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
    hashedTokenToUnsubscribeNewsLetter: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
