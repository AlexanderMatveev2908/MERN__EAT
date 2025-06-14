var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../../models/User.js";
import { baseErrResponse, unauthorizedErr, userNotFound, } from "../../utils/baseErrResponse.js";
import { checkTokenSHA } from "../../utils/token.js";
import Restaurant from "../../models/Restaurant.js";
import { clearData } from "../../utils/clearData.js";
import Order from "../../models/Order.js";
import Review from "../../models/Review.js";
import { makeMongoId } from "../../utils/dbPipeline/general.js";
export const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { userId } = req;
    const { manageAccountToken } = req.body;
    const user = yield User.findById(userId);
    if (!user)
        return userNotFound(res);
    if (!((_a = user.tokens.manageAccount) === null || _a === void 0 ? void 0 : _a.hashed))
        return unauthorizedErr(res, "Verification token not emitted");
    const isExpired = new Date((_c = (_b = user.tokens.manageAccount) === null || _b === void 0 ? void 0 : _b.expiry) !== null && _c !== void 0 ? _c : 0).getTime() < Date.now();
    const isMatch = checkTokenSHA(manageAccountToken, (_d = user.tokens.manageAccount) === null || _d === void 0 ? void 0 : _d.hashed, "manageAccount");
    if (isExpired || !isMatch) {
        user.tokens.manageAccount = {
            hashed: null,
            expiry: null,
        };
        yield user.save();
        return unauthorizedErr(res, isExpired ? "Token expired" : "Invalid Token");
    }
    const restaurants = yield Restaurant.find({
        owner: user._id,
    }).populate("dishes");
    const ordersAsOwner = yield Order.find({
        restaurantId: { $in: restaurants.map((el) => el._id) },
        status: { $in: ["confirmed", "processing", "shipped"] },
    });
    if (ordersAsOwner === null || ordersAsOwner === void 0 ? void 0 : ordersAsOwner.length)
        return baseErrResponse(res, 403, "You have orders to process");
    const ordersAsUser = yield Order.find({
        userId: user._id,
        status: { $in: ["confirmed", "processing", "shipped"] },
    });
    if (ordersAsUser === null || ordersAsUser === void 0 ? void 0 : ordersAsUser.length)
        return baseErrResponse(res, 403, "You have orders to receive");
    if (restaurants === null || restaurants === void 0 ? void 0 : restaurants.length) {
        const promises = restaurants.map((el) => __awaiter(void 0, void 0, void 0, function* () { return yield clearData(el); }));
        yield Promise.all(promises);
    }
    yield Order.updateMany({ userId: { $eq: makeMongoId(userId !== null && userId !== void 0 ? userId : "") } }, { userId: null });
    yield Review.deleteMany({ user: { $eq: makeMongoId(userId !== null && userId !== void 0 ? userId : "") } });
    const result = yield User.deleteOne({ _id: makeMongoId(userId !== null && userId !== void 0 ? userId : "") });
    if ((result === null || result === void 0 ? void 0 : result.deletedCount) !== 1) {
        return userNotFound(res);
    }
    else {
        res.cookie("refreshToken", "", { expires: new Date(0) });
        return res.status(200).json({ success: true, msg: "Account deleted" });
    }
});
/*
  if (restaurants?.length) {
    const promises = restaurants.map(async (el) => {
      if (el?.dishes?.length) {
        const promisesDishesImages = el.dishes
          .map(async (dish: HydratedDocument<DishType>) =>
            dish.images.map(async (img) => await deleteCloud(img.public_id))
          )
          .flat(Infinity);
        const promisesDishes = el.dishes.map(
          async (dish: HydratedDocument<DishType>) => await dish.deleteOne()
        );

        await Promise.all([...promisesDishesImages, promisesDishes]);
      }
      const promisesRestaurantImages = el.images.map(
        async (img: ImageType) => await deleteCloud(img.public_id)
      );
      await Promise.all(promisesRestaurantImages);

      await el.deleteOne();
    });

    await Promise.all(promises);
  }
    */
