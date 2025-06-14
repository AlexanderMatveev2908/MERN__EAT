import mongoose, { HydratedDocument } from "mongoose";
import Dish, { DishType } from "../models/Dish.js";
import Restaurant, { RestaurantType } from "../models/Restaurant.js";
import { deleteCloud } from "./cloud.js";
import Cart, { CartItem, CartType } from "../models/Cart.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Review from "../models/Review.js";

export const clearDataDish = async (dish: DishType) => {
  if (dish.images?.length) {
    const promisesImgs: Promise<any>[] = [];

    let i = 0;
    do {
      promisesImgs.push(deleteCloud(dish.images[i].public_id));
      i++;
    } while (i < dish.images.length);

    await Promise.all(promisesImgs);
  }

  const carts = await Cart.find({
    "items.dishId": dish._id,
  });

  if (carts.length) {
    const idsDelete: mongoose.Types.ObjectId[] = [];
    const promisesUpdate: Promise<any>[] = [];

    for (const cart of carts) {
      if ((cart?.items?.length ?? 0) < 2) {
        idsDelete.push(cart._id);
      } else {
        cart.items = cart.items.filter(
          (el: CartItem) => el.dishId + "" !== dish._id + ""
        );
        promisesUpdate.push(
          Cart.findByIdAndUpdate(cart._id, { items: cart.items })
        );
      }
    }

    if (promisesUpdate) await Promise.all(promisesUpdate);
    if (idsDelete) {
      await User.updateMany({ cart: { $in: idsDelete } }, { cart: null });
      await Cart.deleteMany({ _id: { $in: idsDelete } });
    }
  }

  await Dish.findByIdAndDelete(dish._id);
};

export const clearData = async (rest: HydratedDocument<RestaurantType>) => {
  const promisesImgsImgRest = rest.images.map(
    async (img) => await deleteCloud(img.public_id)
  );

  try {
    await Promise.all(promisesImgsImgRest);
  } catch {}

  await Order.updateMany(
    { restaurantId: { $eq: rest._id } },
    { restaurantId: null }
  );

  const carts = await Cart.find({
    restaurant: rest._id,
  });
  if (carts?.length) {
    const promisesDishes = carts
      .map((cart: CartType) =>
        cart?.items?.map(async (item: CartItem) => {
          const dish = await Dish.findById(item.dishId);
          if (dish) await clearDataDish(dish);
        })
      )
      .flat(Infinity);

    await Promise.all(promisesDishes);
  }

  await Review.deleteMany({ restaurant: { $eq: rest._id } });
  await Restaurant.findByIdAndDelete(rest._id);
};

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
