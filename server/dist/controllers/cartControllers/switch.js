var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Cart from "../../models/Cart.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
import Dish from "../../models/Dish.js";
import Restaurant from "../../models/Restaurant.js";
import User from "../../models/User.js";
export const switchCartLogged = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { dishId } = req.query;
    const cart = yield Cart.findOne({
        user: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
    });
    const dish = yield Dish.findById(dishId);
    if (!dishId)
        return baseErrResponse(res, 404, "Dish not found");
    if (!dish.quantity)
        return baseErrResponse(res, 400, "Dish not available");
    const restaurant = yield Restaurant.findById(dish.restaurant);
    if (!restaurant)
        return baseErrResponse(res, 404, "Restaurant not found");
    if (cart) {
        const deletedCart = yield cart.deleteOne();
        if (deletedCart.deletedCount !== 1)
            return baseErrResponse(res, 500, "Error deleting cart");
    }
    const newCart = yield Cart.create({
        user: userId,
        restaurant: restaurant._id,
        items: [
            {
                dishId: dish._id,
                name: dish.name,
                price: dish.price,
                quantity: 1,
            },
        ],
    });
    yield User.findByIdAndUpdate(userId, { cart: newCart });
    return res.status(200).json({ msg: "Cart updated", success: true });
});
