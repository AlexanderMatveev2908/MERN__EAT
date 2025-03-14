/* eslint-disable @typescript-eslint/no-explicit-any */
import { MyRestaurantsAddUpdateFormType } from "../types/myRestaurants";
import { reverseFormaTimeHhMm } from "./formatTime";

export const prepareFormData = (
  data: MyRestaurantsAddUpdateFormType
): FormData => {
  const formData = new FormData();

  const { images, categories, ...primitiveVals } = data;

  [...(images as any)].forEach((img) =>
    images.every((img) => img instanceof File)
      ? formData.append("restaurantsImages", img)
      : formData.append("restaurantsImages", JSON.stringify(img))
  );
  categories.forEach((cat) => formData.append("categories", cat));

  for (const key in primitiveVals) {
    if (primitiveVals[key]) {
      if (["openTime", "closeTime"].includes(key))
        formData.append(
          key,
          `${reverseFormaTimeHhMm(primitiveVals[key]) + ""}`
        );
      else
        formData.append(
          key,
          primitiveVals[key as keyof MyRestaurantsAddUpdateFormType]
        );
    }
  }

  return formData;
};
