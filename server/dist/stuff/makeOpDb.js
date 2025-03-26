var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Cart from "../models/Cart.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";
export const updateRest = () => __awaiter(void 0, void 0, void 0, function* () {
    const rest = yield Restaurant.findById("67dd5666537f1a7c2103ee43");
    const randomRest = yield Restaurant.findById("67dec23c33223dc5e44d3799");
    rest.images = [
        ...randomRest.images.map((el) => (Object.assign(Object.assign({}, el), { _id: rest._id }))),
    ];
    yield rest.save();
});
export const makeCart = () => __awaiter(void 0, void 0, void 0, function* () {
    yield User.updateMany({}, { $set: { cart: null } });
    const carts = yield Cart.find({});
    if (!(carts === null || carts === void 0 ? void 0 : carts.length))
        return;
    let i = 0;
    do {
        yield Cart.findByIdAndDelete(carts[i]._id);
        i++;
    } while (i < carts.length);
});
export const clearDishes = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Restaurant.updateMany({}, { $set: { dishes: [] } });
});
