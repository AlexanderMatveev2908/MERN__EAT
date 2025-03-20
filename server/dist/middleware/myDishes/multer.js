import multer from "multer";
import path from "path";
import fs from "fs";
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename).slice(1);
// don't know why, usually in module js the path has a / more than needed at beginning
const uploadPath = path.join(__dirname, "../../uploads");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadPath))
            fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        var _a;
        const fileUploaded = `${Date.now()}_${file.originalname}`;
        const fileObj = { path: path.join(uploadPath, fileUploaded) };
        if (!((_a = req.uploadedFiles) === null || _a === void 0 ? void 0 : _a.length))
            req.uploadedFiles = [fileObj];
        else
            req.uploadedFiles.push(fileObj);
        cb(null, fileUploaded);
    },
});
export const uploadMyDishes = multer({
    storage: storage,
    limits: {
        fileSize: Math.pow(1024, 2) * 5,
    },
}).fields(Array.from({ length: 20 }).map((_, i) => ({
    name: `images_${i}`,
    maxCount: 5,
})));
