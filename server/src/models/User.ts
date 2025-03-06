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
  hasSubscribedToNewsletter: boolean;
  tokens: {
    refresh: {
      hashed: string | null;
      expiry: Date | null;
    };
    verifyAccount: {
      hashed: string | null;
      expiry: Date | null;
    };
    recoverPwd: {
      hashed: string | null;
      expiry: Date | null;
    };
    subScribeNewsLetter: {
      hashed: string | null;
      expiry: Date | null;
    };
    unSubScribeNewsLetter: {
      hashed: string | null;
      expiry: Date | null;
    };
  };
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
    hasSubscribedToNewsletter: {
      type: Boolean,
      default: false,
    },
    tokens: {
      refresh: {
        hashed: {
          type: String,
          default: null,
        },
        expiry: {
          type: Date,
          default: null,
        },
      },
      verifyAccount: {
        hashed: {
          type: String,
          default: null,
        },
        expiry: {
          type: Date,
          default: null,
        },
      },
      recoverPwd: {
        hashed: {
          type: String,
          default: null,
        },
        expiry: {
          type: Date,
          default: null,
        },
      },
      unSubScribeNewsLetter: {
        hashed: {
          type: String,
          default: null,
        },
        expiry: {
          type: Date,
          default: null,
        },
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
