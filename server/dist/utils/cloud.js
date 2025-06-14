var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { v2 } from "cloudinary";
import fs from "fs";
import streamifier from "streamifier";
export const uploadCloud = (files) => {
    const promises = files === null || files === void 0 ? void 0 : files.restaurantImages.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const b64 = file.buffer.toString("base64");
        const dataURI = "data:" + file.mimetype + ";base64," + b64;
        const res = yield v2.uploader.upload(dataURI, {
            resource_type: "auto",
            folder: "food_app",
        });
        return { public_id: res.public_id, url: res.secure_url };
    }));
    return Promise.all(promises);
};
export const deleteCloud = (public_id) => __awaiter(void 0, void 0, void 0, function* () { return yield v2.uploader.destroy(public_id); });
export const uploadCloudStorage = (files) => {
    const promises = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield v2.uploader.upload(file.path, {
            resource_type: "auto",
            folder: "dishes",
        });
        for (const file of files) {
            if (fs.existsSync(file.path))
                fs.unlinkSync(file.path);
        }
        return { public_id: res.public_id, url: res.secure_url };
    }));
    return Promise.all(promises);
};
export const uploadUpdateDish = (files) => {
    const promises = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const b64 = file.buffer.toString("base64");
        const dataURI = "data:" + file.mimetype + ";base64," + b64;
        const res = yield v2.uploader.upload(dataURI, {
            resource_type: "auto",
            folder: "dishes",
        });
        return { public_id: res.public_id, url: res.secure_url };
    }));
    return Promise.all(promises);
};
export const uploadCloudURL = (urlCloud) => __awaiter(void 0, void 0, void 0, function* () {
    // we could simply upload img by url existent, i used stream here just for study purposes
    const res = yield axios.get(urlCloud, { responseType: "arraybuffer" });
    const buffer = Buffer.from(res.data, "binary");
    return new Promise((res, rej) => {
        const uploadStream = v2.uploader.upload_stream({
            resource_type: "auto",
            folder: "orders",
        }, (err, result) => {
            if (err)
                rej(err);
            const { public_id, secure_url: url } = result;
            res({ public_id, url });
        });
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
});
export const uploadCloudMyReviews = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = files.map((el) => __awaiter(void 0, void 0, void 0, function* () {
        const b64 = el.buffer.toString("base64");
        const dataURI = "data:" + el.mimetype + ";base64," + b64;
        const { public_id, secure_url: url } = yield v2.uploader.upload(dataURI, {
            resource_type: "auto",
            folder: "reviews",
        });
        return { public_id, url };
    }));
    return yield Promise.all(promises);
});
