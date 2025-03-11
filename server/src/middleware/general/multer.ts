import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 ** 2 * 5,
  },
});
