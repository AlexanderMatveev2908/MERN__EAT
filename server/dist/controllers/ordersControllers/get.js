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
import { makeMongoId } from "../../utils/dbPipeline/general.js";
import { badRequest, baseErrResponse } from "../../utils/baseErrResponse.js";
const getCreatedAt = (el) => new Date(el.createdAt);
const getUpdatedAt = (el) => new Date(el.updatedAt);
export const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { userId } = req;
    const queryObj = makeQMyOrders(req);
    const sortObj = makeSorters(req, "");
    const { limit, skip } = calcPagination(req);
    const totDocuments = yield Order.countDocuments({
        userId: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
    });
    const nHits = yield Order.countDocuments(queryObj);
    if (!totDocuments)
        return handleNoHits(res, totDocuments);
    let orders = (yield Order.find(queryObj)
        .skip(skip)
        .limit(limit)
        .populate({
        path: "restaurantId",
        populate: {
            path: "reviews",
        },
    })
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
        curr.hasLeftReview = (_b = (_a = curr === null || curr === void 0 ? void 0 : curr.restaurantId) === null || _a === void 0 ? void 0 : _a.reviews) === null || _b === void 0 ? void 0 : _b.some((review) => review.user + "" === userId);
        curr.restaurantId = (curr === null || curr === void 0 ? void 0 : curr.restaurantId)
            ? {
                _id: (_c = curr.restaurantId) === null || _c === void 0 ? void 0 : _c._id,
                delivery: (_d = curr.restaurantId) === null || _d === void 0 ? void 0 : _d.delivery,
            }
            : null;
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
export const getOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { orderId } = req.params;
    const order = (yield Order.findOne({
        userId: makeMongoId(userId !== null && userId !== void 0 ? userId : ""),
        _id: makeMongoId(orderId),
    }).lean());
    if (!order)
        return baseErrResponse(res, 404, "Order not found");
    if (["pending", "cancelled"].includes(order.status))
        return badRequest(res);
    return res.status(200).json({
        success: true,
        message: "Order ok",
        status: order.status,
    });
});
