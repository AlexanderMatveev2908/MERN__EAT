import { RestAdminState } from "../../types/restAdmin";

export const restAdminInitState: RestAdminState = {
  queries: {
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
