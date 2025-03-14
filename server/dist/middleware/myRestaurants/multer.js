import multer from "multer";
const storage = multer.memoryStorage();
export const uploadMyRestaurants = multer({
  storage: storage,
  limits: {
    fileSize: Math.pow(1024, 2) * 5,
  },
}).fields([
  {
    name: "restaurantImages",
    maxCount: 5,
  },
]);
