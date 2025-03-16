import { Request } from "express";

export const makeSortersMyRestaurants = (req: Request) => {
  const {
    ratingSort,
    reviewsSort,
    priceSort,
    dishesSort,
    ordersSort,
    createdAtSort,
    updatedAtSort,
  } = req.query;

  const sorter: any = {};

  if (createdAtSort)
    sorter["restaurants.createdAt"] = createdAtSort === "asc" ? 1 : -1;
  if (updatedAtSort)
    sorter["restaurants.updatedAt"] = updatedAtSort === "asc" ? 1 : -1;
  if (ratingSort)
    sorter["restaurants.avgRating"] = ratingSort === "asc" ? 1 : -1;
  if (ordersSort)
    sorter["restaurants.ordersCount"] = ordersSort === "asc" ? 1 : -1;
  if (reviewsSort)
    sorter["restaurants.reviewsCount"] = reviewsSort === "asc" ? 1 : -1;
  if (priceSort) sorter["restaurants.avgPrice"] = priceSort === "asc" ? 1 : -1;
  if (dishesSort)
    sorter["restaurants.dishesCount"] = dishesSort === "asc" ? 1 : -1;
  // if (deliveryTimeSort)
  //   sorter["restaurants.delivery.estTimeDelivery"] =
  //     deliveryTimeSort === "asc" ? 1 : -1;
  // if (deliveryPriceSort)
  //   sorter["restaurants.delivery.price"] = deliveryPriceSort === "asc" ? 1 : -1;

  return { sorter: Object.keys(sorter ?? {}).length ? sorter : null };
};
