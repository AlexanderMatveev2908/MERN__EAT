/* eslint-disable @typescript-eslint/no-explicit-any */
import { MyRestaurantsAddUpdateFormType } from "../types/myRestaurants";

export const prepareFormData = (
  data: MyRestaurantsAddUpdateFormType
): FormData => {
  const formData = new FormData();

  const { images, categories, ...primitiveVals } = data;

  [...(images as any)].forEach((img) =>
    formData.append("restaurantsImages", img)
  );
  categories.forEach((cat) => formData.append("categories", cat));

  for (const key in primitiveVals) {
    formData.append(
      key,
      primitiveVals[key as keyof MyRestaurantsAddUpdateFormType]
    );
  }

  return formData;
};
