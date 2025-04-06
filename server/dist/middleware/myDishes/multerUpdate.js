import multer from "multer";
const storage = multer.memoryStorage();
export const updateDishesUpload = multer({
    storage,
    limits: {
        fileSize: Math.pow(1024, 2) * 5,
    },
}).array("images", 5);
