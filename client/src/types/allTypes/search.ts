export type SearchFormType = {
  search: string;
  searchVals: string[];
  categories: string[];
  avgPriceRange: string[];
  avgRatingRange: string[];

  avgRatingSort: ["asc" | "desc"] | [];
  avgPriceSort: ["asc" | "desc"] | [];
  deliveryTimeSort: ["asc" | "desc"] | [];
  deliveryPriceSort: ["asc" | "desc"] | [];

  page?: string;
  limit?: string;
};
