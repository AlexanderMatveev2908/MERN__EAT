import { RestAdminState } from "../../types/restAdmin";

export const restAdminInitState: RestAdminState = {
  queries: {
    categories: [],
    minRating: 0,
    maxRating: 0,
    minPriceRange: 0,
    maxPriceRange: 0,
  },
  sorters: {
    dishes: "",
    orders: "",
    reviews: "",
    rating: "",
  },
};
