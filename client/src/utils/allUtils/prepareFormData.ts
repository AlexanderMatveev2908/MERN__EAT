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

export const prepareFormDataMyDishUpdate = (formDataHook) => {
  const formData = new FormData();

  const { images, ...primitiveVals } = formDataHook.items[0];

  const areFiles = [...images].every((el) => el instanceof File);
  if (images?.length && areFiles)
    [...images].forEach((img) => {
      formData.append(`images`, img);
    });
  else formData.append(`images`, JSON.stringify(images));

  for (const key in primitiveVals) {
    formData.append(key, primitiveVals[key]);
  }

  formData.append("restaurant", formDataHook.restaurant);

  return formData;
};

export const prepareFormDataMyReviews = (formDataHook) => {
  const formData = new FormData();

  const { images, ...primitiveVals } = formDataHook;

  if (images.length)
    [...images].forEach((img) => {
      formData.append(`images`, img);
    });

  const arr = Object.entries(primitiveVals);

  let i = 0;
  do {
    const pair = arr[i];

    if (pair[1])
      formData.append(
        pair[0],
        typeof pair[1] === "string" ? pair[1] : pair[1] + ""
      );

    i++;
  } while (i < arr.length);

  return { formData };
};
