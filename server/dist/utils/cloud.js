var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v2 } from "cloudinary";
import fs from "fs";
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
    const { public_id, secure_url: url } = yield v2.uploader.upload(urlCloud, {
        resource_type: "auto",
        folder: "orders",
    });
    return { public_id, url };
});
