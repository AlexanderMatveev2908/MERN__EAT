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
import { badRequest, baseErrResponse } from "../../utils/baseErrResponse.js";
import Dish from "../../models/Dish.js";
import Restaurant from "../../models/Restaurant.js";
import User from "../../models/User.js";
const lookForItemsQty = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const { cart } = req.body;
    const newCart = {
        user: userId,
        restaurant: cart.restaurant,
        items: [],
    };
    let i = 0;
    do {
        const curr = cart.items[i];
        const dish = yield Dish.findById(curr.dishId);
        if (!dish || !dish.quantity)
            continue;
        (_a = newCart === null || newCart === void 0 ? void 0 : newCart.items) === null || _a === void 0 ? void 0 : _a.push({
            name: dish.name,
            price: dish.price,
            dishId: dish._id,
            quantity: curr.quantity > dish.quantity ? dish.quantity : curr.quantity,
        });
        i++;
    } while (i < cart.items.length);
    return { newCart };
});
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
export const switchCartFromLocalStorage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const { cart } = req.body;
    const existingCart = yield Cart.findOne({ user: makeMongoId(userId !== null && userId !== void 0 ? userId : "") });
    if (!existingCart)
        return baseErrResponse(res, 404, "Cart not found");
    const { newCart } = yield lookForItemsQty(req);
    if (!((_a = newCart === null || newCart === void 0 ? void 0 : newCart.items) === null || _a === void 0 ? void 0 : _a.length))
        return res.status(422).json({ msg: "Items not available", success: true });
    const count = yield Cart.deleteOne({ user: makeMongoId(userId !== null && userId !== void 0 ? userId : "") });
    if (count.deletedCount !== 1)
        return baseErrResponse(res, 500, "Error deleting cart");
    const newMongoCart = yield Cart.create(newCart);
    yield User.findByIdAndUpdate(userId, { cart: newMongoCart._id });
    return res.status(200).json({ msg: "Cart replaced", success: true });
});
export const saveDbStorageCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const existingCart = yield Cart.findOne({ user: makeMongoId(userId !== null && userId !== void 0 ? userId : "") });
    if (existingCart)
        return badRequest(res);
    const { newCart } = yield lookForItemsQty(req);
    if (!((_a = newCart === null || newCart === void 0 ? void 0 : newCart.items) === null || _a === void 0 ? void 0 : _a.length))
        return baseErrResponse(res, 422, "Dishes not currently available or removed");
    const newMongoCart = yield Cart.create(newCart);
    yield User.findByIdAndUpdate(userId, { cart: newMongoCart._id });
    return res.status(201).json({ msg: "Cart saved", success: true });
});
