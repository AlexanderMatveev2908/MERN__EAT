import multer from "multer";

const storage = multer.memoryStorage();

export const uploadImgMyReviews = multer({
  storage,
  limits: {
    fileSize: 1024 ** 2 * 5,
  },
}).any();
