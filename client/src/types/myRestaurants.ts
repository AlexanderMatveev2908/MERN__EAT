export type DishMenuFormType = {
  name: string;
  quantity: number;
  price: number;
  discount: number;
  description: string;
  images: File[];
};

export type RestaurantAddressType = {
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type RestaurantContactType = {
  email: string;
  phone: string;
  website: string;
};

export type RestaurantOpenHoursType = {
  openTime: string;
  closeTime: string;
};

export type ImageUploadedType = {
  url: string;
  public_id: string;
};

export type MyRestaurantsAddUpdateFormType = {
  name: string;
  categories: string[];
  deliveryTime: string;
  images: File[] | ImageUploadedType[];
  dishes: DishMenuFormType[];
} & RestaurantAddressType &
  RestaurantOpenHoursType &
  RestaurantContactType;
