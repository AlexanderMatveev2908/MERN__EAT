import { MyRestaurantsAddUpdateFormType } from "../../types/allTypes/restAdmin";
import { reverseFormaTimeHhMm } from "./formatTime";

export const prepareFormDataMyRest = (
  data: MyRestaurantsAddUpdateFormType
): FormData => {
  const formData = new FormData();

  const { images, categories, ...primitiveVals } = data;

  const areFiles = [...images].every((img) => img instanceof File);

  if (areFiles)
    [...(images as File[])].forEach((img) =>
      formData.append("restaurantImages", img)
    );
  else formData.append("restaurantImages", JSON.stringify(images));

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

export const prepareFormDataMyDishes = (formDataHook) => {
  const formData = new FormData();

  let i = 0;

  while (i < formDataHook.items.length) {
    const { images, ...primitiveVals } = formDataHook.items[i];
    const areFiles = [...images].every((el) => el instanceof File);
    if (images?.length && areFiles)
      [...images].forEach((img) => {
        formData.append(`images_${i}`, img);
      });
    else formData.append(`images_${i}`, JSON.stringify(images));
    for (const key in primitiveVals) {
      formData.append(`dishes[${i}][${key}]`, primitiveVals[key]);
    }

    i++;
  }

  return formData;
};
