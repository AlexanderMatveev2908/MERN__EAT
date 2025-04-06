import mongoose, { Schema } from "mongoose";
import { OrderType } from "./Order.js";
import { CartType } from "./Cart.js";

export type AddressType = {
  country: string | null;
  state: string | null;
  city: string | null;
  street: string | null;
  zipCode: string | null;
  phone: string | null;
};
export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  tempNewEmail: string | null;
  password: string;
  address: AddressType;
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
    unSubScribeNewsLetter: {
      hashed: string | null;
      expiry: Date | null;
    };
    manageAccount: {
      hashed: string | null;
      expiry: Date | null;
    };
    verifyNewEmail: {
      hashed: string | null;
      expiry: Date | null;
    };
  };

  cart: CartType | mongoose.Types.ObjectId;
  orders: OrderType[];
  createdAt: Date;
  updatedAt: Date;
};

export const AddressSchema = new mongoose.Schema({
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
});

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
    tempNewEmail: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    address: AddressSchema,
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
      manageAccount: {
        hashed: {
          type: String,
          default: null,
        },
        expiry: {
          type: Date,
          default: null,
        },
      },
      verifyNewEmail: {
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
    restaurants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      default: null,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
