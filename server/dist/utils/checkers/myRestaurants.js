var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { forbiddenErr, notFoundErr, userNotFound } from "../baseErrResponse.js";
import User from "../../models/User.js";
import Restaurant from "../../models/Restaurant.js";
export const checkUserProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { restId } = req.params;
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    const restaurant = yield Restaurant.findById(restId);
    if (!restaurant)
        return notFoundErr(res);
    if (!restaurant.owner.equals(user._id))
        return forbiddenErr(res);
    return { user, restaurant };
});
