import multer from "multer";

const storage = multer.memoryStorage();

export const updateDishesUpload = multer({
  storage,
  limits: {
    fileSize: 1024 ** 2 * 5,
  },
}).array("images", 5);
