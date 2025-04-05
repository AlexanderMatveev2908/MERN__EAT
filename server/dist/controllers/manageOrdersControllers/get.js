var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { calcPagination } from "../../utils/makeQueries/calcPagination.js";
import Order from "../../models/Order.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import Restaurant from "../../models/Restaurant.js";
import { handleNoHits } from "../../utils/handleNoHits.js";
import { filterManageOrders } from "../../utils/makeQueries/manageOrders.js";
import { makeSorters } from "../../utils/makeSorters/general.js";
import { sortOrders } from "./funnyRecursive.js";
export const getManageOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const restaurants = yield Restaurant.find({
        owner: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
    });
    if (!restaurants.length)
        return handleNoHits(res, 0);
    const ids = restaurants.map((el) => el._id);
    const { limit, skip } = calcPagination(req);
    const sortObj = makeSorters(req, "");
    const totDocuments = yield Order.countDocuments({
        restaurantId: { $in: ids },
    });
    const orders = yield Order.find({
        restaurantId: { $in: ids },
    })
        .populate("restaurantId")
        .lean();
    const { filtered } = filterManageOrders(req, orders.map((el) => {
        var _a;
        return (Object.assign(Object.assign({}, el), { restaurantId: (el === null || el === void 0 ? void 0 : el.restaurantId)
                ? {
                    _id: (_a = el.restaurantId) === null || _a === void 0 ? void 0 : _a._id,
                    categories: el === null || el === void 0 ? void 0 : el.restaurantId.categories,
                    delivery: el === null || el === void 0 ? void 0 : el.restaurantId.delivery,
                }
                : null }));
    }));
    const nHits = filtered.length;
    const totPages = Math.ceil(nHits / limit);
    let sorted = filtered;
    if (sortObj)
        sorted = sortOrders(filtered, sortObj);
    const cutted = sorted.slice(skip, skip + limit);
    return res.status(200).json({
        message: "ok",
        success: true,
        orders: cutted,
        totPages,
        totDocuments,
        nHits,
    });
});
