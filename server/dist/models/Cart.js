import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            dish: {
                type: mongoose.Types.ObjectId,
                ref: "Dish",
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
}, { timestamps: true });
const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;
