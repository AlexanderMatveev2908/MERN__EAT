import { RequestWithUserId } from "../middleware/general/verifyAccessToken";

export const formatMyRestaurantsBody = (req: RequestWithUserId) => {
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
      email: email ?? null,
      phone: phone ?? null,
      website: website ?? null,
    },
    openHours: {
      openTime,
      closeTime,
    },
    categories,
    delivery: {
      estTimeDelivery,
      price: price ?? null,
      freeDeliveryPrice: freeDeliveryPrice ?? null,
    },
  };
};
