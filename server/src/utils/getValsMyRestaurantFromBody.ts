import { RequestWithUserId } from "../middleware/general/verifyAccessToken.js";
import { RestaurantType } from "../models/Restaurant.js";

export const formatMyRestaurantsBody = (
  req: RequestWithUserId,
  userEmail: string,
  userPhone: string
) => {
  const { userId } = req;

  const {
    estTimeDelivery,
    price,
    freeDeliveryPrice,
    openTime,
    closeTime,
    name,
    categories,
    phone,
    email,
    website,
    ...address
  } = req.body;

  //   mongoose automatically if we set a type for a val in schema it treats that value as type given

  return {
    owner: userId,
    name,
    address,
    contact: {
      email: email ?? userEmail,
      phone: phone ?? userPhone,
      website: website ?? null,
    },
    openHours: {
      openTime,
      closeTime,
    },
    categories,
    delivery: {
      estTimeDelivery,
      price: price ?? 0,
      freeDeliveryPrice: freeDeliveryPrice ?? 0,
    },
  };
};
