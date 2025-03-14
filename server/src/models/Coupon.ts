import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    hashedCode: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    categories: [
      {
        type: String,
      },
    ],
    minCartPrice: {
      type: Number,
      required: true,
    },
    usedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    usedFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);

export default Coupon;
