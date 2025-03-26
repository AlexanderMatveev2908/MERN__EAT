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
import { REG_QTY } from "../../config/constants/regex.js";
const getDataRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { dishId } = req.query;
    const cart = (yield Cart.findOne({
        user: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
    }));
    const dish = yield Dish.findById(dishId);
    const restaurant = yield Restaurant.findById(dish.restaurant);
    // if from frontend come a req about other dish from cart restaurant, then restaurant will not be found and i send 404 that implicit is 400
    if ([dish, restaurant].some((el) => !el))
        return baseErrResponse(res, 404, "Not found something");
    return {
        cart,
        dish,
        restaurant,
        ok: true,
    };
});
export const incQtyCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const { cart, dish, restaurant, ok } = yield getDataRequest(req, res);
    if (!ok)
        return;
    if (!dish.quantity)
        return baseErrResponse(res, 400, "Bad req");
    let newCart = null;
    if ((_a = cart === null || cart === void 0 ? void 0 : cart.items) === null || _a === void 0 ? void 0 : _a.length) {
        const existingItem = cart.items.find((el) => el.dishId.equals(dish._id));
        if (existingItem) {
            if (existingItem.quantity + 1 > dish.quantity)
                return badRequest(res);
            cart.items = [
                ...cart.items.map((el) => el.dishId + "" === dish._id + ""
                    ? Object.assign(Object.assign({}, el), { quantity: el.quantity + 1 }) : el),
            ];
        }
        else {
            cart.items.push({
                dishId: dish._id,
                name: dish.name,
                price: dish.price,
                quantity: 1,
            });
        }
    }
    else {
        newCart = yield Cart.create({
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
    }
    if (!newCart)
        yield cart.save();
    return res.status(200).json({
        msg: "Item added to cart",
        success: true,
    });
});
export const decQtyCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { cart, dish, ok } = yield getDataRequest(req, res);
    if (!ok)
        return;
    if (!cart)
        return badRequest(res);
    let deletedCart;
    const existingItem = cart.items.find((el) => el.dishId + "" === dish._id + "");
    if (!existingItem)
        return baseErrResponse(res, 404, "Dish not found, bad req");
    if (existingItem.quantity > 1) {
        cart.items = cart.items.map((el) => el.dishId + "" === existingItem.dishId + ""
            ? Object.assign(Object.assign({}, el), { quantity: el.quantity - 1 }) : el);
    }
    else {
        if (cart.items.length > 1) {
            cart.items = cart.items.filter((el) => !el.dishId.equals(existingItem.dishId));
        }
        else {
            deletedCart = yield Cart.findByIdAndDelete(cart._id);
            yield User.findByIdAndUpdate(userId, { cart: null });
        }
    }
    if (!deletedCart)
        yield cart.save();
    return res.status(200).json({
        success: true,
        msg: `Item removed ${existingItem.quantity > 1 ? "" : "from cart"}`,
    });
});
export const delItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { cart, dish, ok } = yield getDataRequest(req, res);
    if (!ok)
        return;
    if (!cart)
        return badRequest(res);
    let deletedCart;
    if (cart.items.length > 1) {
        cart.items = cart.items.filter((el) => el.dishId + "" !== dish._id + "");
    }
    else {
        deletedCart = yield cart.deleteOne();
        yield User.findByIdAndUpdate(userId, { cart: null });
    }
    if (!(deletedCart === null || deletedCart === void 0 ? void 0 : deletedCart.deletedCount))
        yield cart.save();
    return res.status(200).json({ success: true, msg: "Item removed from cart" });
});
export const delCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const cartDeleted = yield Cart.findOneAndDelete({
        user: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
    });
    if (!cartDeleted)
        return baseErrResponse(res, 404, "Cart not found, bad req");
    return res.status(200).json({ msg: "Cart deleted", success: true });
});
export const updateQtyByInput = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity } = req.body;
    if (!REG_QTY.test(quantity))
        return badRequest(res);
    const { cart, dish, ok } = yield getDataRequest(req, res);
    if (!ok)
        return;
    if (!cart)
        return badRequest(res);
    const existingItem = cart.items.find((el) => el.dishId + "" === dish._id + "");
    if (!existingItem)
        return badRequest(res);
    if (dish.quantity < +quantity)
        return baseErrResponse(res, 400, "Qty not avl");
    cart.items = cart.items.map((el) => el.dishId + "" === existingItem.dishId + ""
        ? Object.assign(Object.assign({}, el), { quantity }) : el);
    yield cart.save();
    return res.status(200).json({ success: true, msg: "Cart updated" });
});
export const updateQtyIntervalFormFront = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req;
    const { quantity } = req.body;
    if (!REG_QTY.test(quantity))
        return badRequest(res);
    const { cart, dish, restaurant, ok } = yield getDataRequest(req, res);
    if (!ok)
        return;
    if (!dish.quantity)
        return badRequest(res);
    let newCart;
    const qty = dish.quantity < quantity ? dish.quantity : quantity || 1;
    if ((_a = cart === null || cart === void 0 ? void 0 : cart.items) === null || _a === void 0 ? void 0 : _a.length) {
        const existingItem = cart.items.find((el) => el.dishId + "" === dish._id + "");
        // // instead of sending 400 i send 200 but i put just as much as there is avl
        if (existingItem) {
            cart.items = cart.items.map((el) => el.dishId + "" === existingItem.dishId + ""
                ? Object.assign(Object.assign({}, el), { quantity: qty }) : el);
        }
        else {
            cart.items.push({
                dishId: dish._id,
                name: dish.name,
                price: dish.price,
                quantity: qty,
            });
        }
    }
    else {
        newCart = yield Cart.create({
            user: userId,
            restaurant: restaurant._id,
            items: [
                {
                    dishId: dish._id,
                    name: dish.name,
                    price: dish.price,
                    quantity: qty,
                },
            ],
        });
        yield User.findByIdAndUpdate(userId, {
            cart: newCart,
        });
    }
    if (!newCart)
        yield cart.save();
    return res.status(200).json({ success: true, msg: "Cart updated" });
});
