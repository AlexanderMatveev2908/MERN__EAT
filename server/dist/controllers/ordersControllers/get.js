var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Order from "../../models/Order.js";
import { makeQMyOrders } from "../../utils/makeQueries/myOrders.js";
import { makeSorters } from "../../utils/makeSorters/general.js";
import { heapDiscountAsc, heapDiscountDesc, mergeSortPrice, quickSortDate, } from "./funnyRecursive.js";
import { calcPagination } from "../../utils/makeQueries/calcPagination.js";
import { handleNoHits } from "../../utils/handleNoHits.js";
const getCreatedAt = (el) => new Date(el.createdAt);
const getUpdatedAt = (el) => new Date(el.updatedAt);
export const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const queryObj = makeQMyOrders(req);
    const sortObj = makeSorters(req, "");
    const { limit, skip } = calcPagination(req);
    const totDocuments = yield Order.countDocuments();
    const nHits = yield Order.countDocuments(queryObj);
    if (!totDocuments)
        return handleNoHits(res, totDocuments);
    let orders = (yield Order.find(queryObj)
        .skip(skip)
        .limit(limit)
        .populate("restaurantId")
        .lean());
    if (!orders.length)
        return handleNoHits(res, totDocuments);
    if (sortObj === null || sortObj === void 0 ? void 0 : sortObj.createdAt)
        orders = quickSortDate(orders, sortObj.createdAt, getCreatedAt);
    if (sortObj === null || sortObj === void 0 ? void 0 : sortObj.updatedAt)
        orders = quickSortDate(orders, sortObj.updatedAt, getUpdatedAt);
    if (sortObj === null || sortObj === void 0 ? void 0 : sortObj.price)
        orders = mergeSortPrice(orders, sortObj.price);
    if (sortObj === null || sortObj === void 0 ? void 0 : sortObj.discount)
        if ((sortObj === null || sortObj === void 0 ? void 0 : sortObj.discount) === 1)
            heapDiscountAsc(orders);
        else if ((sortObj === null || sortObj === void 0 ? void 0 : sortObj.discount) === -1)
            heapDiscountDesc(orders);
    let i = orders.length - 1;
    do {
        const curr = orders[i];
        curr.isAdmin = curr.userId + "" === userId;
        curr.restaurantId = {
            _id: curr.restaurantId._id,
            delivery: curr.restaurantId.delivery,
        };
        i--;
    } while (i >= 0);
    const totPages = Math.ceil(nHits / limit);
    return res.status(200).json({
        success: true,
        message: "Orders retrieved successfully",
        totDocuments,
        totPages,
        nHits,
        orders,
    });
});
