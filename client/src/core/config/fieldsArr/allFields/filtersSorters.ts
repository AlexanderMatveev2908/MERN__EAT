import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { genID } from "../../../../utils/utils";
import { BaseFieldType, RadioFieldType } from "../typesFields";

// IMPORTANT => FOR FUNCTIONALITY OF SEARCHBAR TO BE DYNAMIC AND RESPONSIVE OF ADD OR REMOVE FIELDS IS IMPORT TO FOLLOW STRUCTURES
// {field: string,
// label:string,
// id:string,
// subfields:[
// {field:string,
// label:string,
// id:string
// }]
// }
// if u follow this structure i should work generally

export const categoriesAPP = [
  "italian",
  "chinese",
  "japanese",
  "mexican",
  "indian",
  "french",
  "mediterranean",
  "fast-food",
  "vegetarian",
  "vegan",
  "seafood",
  "steakhouse",
];

export const categoriesAppFields: BaseFieldType[] = categoriesAPP.map((el) => ({
  field: el,
  id: genID(),
  label: el === "fast-food" ? "Fast-Food" : el[0].toUpperCase() + el.slice(1),
}));

const priceRangeFieldsArr = ["0-19", "20-39", "40-59", "60-79", "80-100"];
export const priceRangeFields: BaseFieldType[] = priceRangeFieldsArr.map(
  (el, i, arg) => ({
    field: el,
    id: genID(),
    label: `$${el}${i === arg.length - 1 ? "+" : ""}`,
  })
);

const ratingRangeFieldsArr = ["0-1", "1.1-2", "2.1-3", "3.1-4", "4.1-5"];
export const ratingRangeFields: BaseFieldType[] = ratingRangeFieldsArr.map(
  (el) => ({
    field: el,
    id: genID(),
    label: `⭐ ${el}`,
  })
);

export const fieldsUpAndDown: Omit<RadioFieldType, "id">[] = [
  {
    field: "asc",
    icon: FaSortAmountUp,
  },
  {
    field: "desc",
    icon: FaSortAmountDown,
  },
];
