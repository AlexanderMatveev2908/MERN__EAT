var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Dish from "../models/Dish.js";
import Restaurant from "../models/Restaurant.js";
import { deleteCloud } from "./cloud.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
export const clearDataDish = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if ((_a = dish.images) === null || _a === void 0 ? void 0 : _a.length) {
        const promisesImgs = [];
        let i = 0;
        do {
            promisesImgs.push(deleteCloud(dish.images[i].public_id));
            i++;
        } while (i < dish.images.length);
        yield Promise.all(promisesImgs);
    }
    const carts = yield Cart.find({
        "items.dishId": dish._id,
    });
    if (carts.length) {
        const idsDelete = [];
        const promisesUpdate = [];
        for (const cart of carts) {
            if (((_c = (_b = cart === null || cart === void 0 ? void 0 : cart.items) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) < 2) {
                idsDelete.push(cart._id);
            }
            else {
                cart.items = cart.items.filter((el) => el.dishId + "" !== dish._id + "");
                promisesUpdate.push(Cart.findByIdAndUpdate(cart._id, { items: cart.items }));
            }
        }
        if (promisesUpdate)
            yield Promise.all(promisesUpdate);
        if (idsDelete) {
            yield User.updateMany({ cart: { $in: idsDelete } }, { cart: null });
            yield Cart.deleteMany({ _id: { $in: idsDelete } });
        }
    }
    yield Dish.findByIdAndDelete(dish._id);
});
export const clearData = (rest) => __awaiter(void 0, void 0, void 0, function* () {
    const promisesImgsImgRest = rest.images.map((img) => __awaiter(void 0, void 0, void 0, function* () { return yield deleteCloud(img.public_id); }));
    try {
        yield Promise.all(promisesImgsImgRest);
    }
    catch (_a) { }
    yield Order.updateMany({ restaurantId: { $eq: rest._id } }, { restaurantId: null });
    const carts = yield Cart.find({
        restaurant: rest._id,
    });
    if (carts === null || carts === void 0 ? void 0 : carts.length) {
        const promisesDishes = carts
            .map((cart) => {
            var _a;
            return (_a = cart === null || cart === void 0 ? void 0 : cart.items) === null || _a === void 0 ? void 0 : _a.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                const dish = yield Dish.findById(item.dishId);
                if (dish)
                    yield clearDataDish(dish);
            }));
        })
            .flat(Infinity);
        yield Promise.all(promisesDishes);
    }
    yield Restaurant.findByIdAndDelete(rest._id);
});
/*    // const cartIds = carts.map((el) => el._id);
    // await User.updateMany({ cart: { $in: cartIds } }, { cart: null });
    // await Cart.deleteMany({ _id: { $in: cartIds } });


      // const idsDishes = rest.dishes?.length
  //   ? rest.dishes.map((dish: any) => dish._id)
  //   : [];

  // if (idsDishes.length) {
  //   const resultDishes = await Dish.find({
  //     _id: { $in: idsDishes },
  //   });

  //   const idsImages = resultDishes.flatMap((dish) =>
  //     dish.images.map((img: any) => img.public_id)
  //   );
  //   if (idsImages?.length) {
  //     const promisesImgsImgDishes = idsImages.map(
  //       async (public_id: string) => await deleteCloud(public_id)
  //     );

  //     try {
  //       await Promise.all(promisesImgsImgDishes);
  //     } catch {}
  //   }

  //   await Dish.deleteMany({
  //     _id: { $in: idsDishes },
  //   });
  // }
  */
