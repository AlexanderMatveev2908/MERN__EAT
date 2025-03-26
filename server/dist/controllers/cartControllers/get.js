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
export const getCartUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const cart = (yield Cart.findOne({
        user: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
    }).lean());
    if (!cart)
        return res.status(200).json({ msg: "No cart", success: true, cart });
    return res.status(200).json({ msg: "cart", success: true, cart });
});
