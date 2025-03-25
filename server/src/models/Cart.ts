import mongoose from "mongoose";

export const CartItemSchema = {
  dishId: {
    type: mongoose.Types.ObjectId,
    ref: "Dish",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
};

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    items: [CartItemSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
