var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import Cart from "../../models/Cart.js";
import Dish from "../../models/Dish.js";
import { baseErrResponse } from "../../utils/baseErrResponse.js";
export const getCartUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const cart = (yield Cart.findOne({
        user: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
    }).lean());
    if (!cart)
        return res.status(200).json({ msg: "No cart", success: true, cart });
    cart.totQty = (cart === null || cart === void 0 ? void 0 : cart.items.reduce((acc, curr) => curr.quantity + acc, 0)) || 0;
    cart.totPrice = +((cart === null || cart === void 0 ? void 0 : cart.items.reduce((acc, curr) => curr.price * curr.quantity + acc, 0).toFixed(2)) || "");
    return res.status(200).json({ msg: "cart", success: true, cart });
});
export const getDishInfoQtyInput = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dishId } = req.query;
    const dish = yield Dish.findById(dishId);
    if (!dish)
        return baseErrResponse(res, 404, "No dish");
    return res.status(200).json({ msg: "Dish found", success: true, dish });
});
