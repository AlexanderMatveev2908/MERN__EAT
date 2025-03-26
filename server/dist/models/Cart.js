import mongoose from "mongoose";
// for practical reason i will make user can buy from home only from a restaurant cause is simpler to handle right now, in future i will think to update management to allow user order from multiple restaurants, but anyway even i did not used so much platform for ordering online i remember that for most i used does not allow to order 2 dishes from different places but make u make different orders for management reasons about timing and money split
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
const CartSchema = new mongoose.Schema({
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
}, { timestamps: true });
const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;
