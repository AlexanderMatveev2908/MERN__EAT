import {
  NumericFiltersSearch,
  PageFormType,
  SearchBarForm,
  TimeStampSearch,
} from "./API";

export type ManageOrdersSearch = SearchBarForm &
  NumericFiltersSearch &
  TimeStampSearch &
  PageFormType & {
    priceSort: string[];
    quantitySort: string[];
    discountSort: string[];
  };
