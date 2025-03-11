import multer from "multer";

const storage = multer.memoryStorage();

export const uploadMyRestaurants = multer({
  storage: storage,
  limits: {
    fileSize: 1024 ** 2 * 5,
  },
}).fields([
  {
    name: "restaurantsImages",
    maxCount: 5,
  },
]);
