import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";

export const updateRest = async () => {
  const rest = await Restaurant.findById("67dd5666537f1a7c2103ee43");

  const randomRest = await Restaurant.findById("67dec23c33223dc5e44d3799");

  rest.images = [
    ...randomRest.images.map((el: any) => ({ ...el, _id: rest._id })),
  ];

  await rest.save();
};

export const makeCart = async () => {
  await User.updateMany({}, { $set: { cart: null } });
};
