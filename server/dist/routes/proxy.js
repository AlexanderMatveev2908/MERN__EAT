var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { badRequest } from "../utils/baseErrResponse.js";
import axios from "axios";
const router = express.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { urls } = req.body;
    if (!Array.isArray(urls) || !(urls === null || urls === void 0 ? void 0 : urls.length))
        return badRequest(res);
    const promises = urls.map((url) => __awaiter(void 0, void 0, void 0, function* () {
        const { data, headers } = yield axios.get(url, {
            responseType: "arraybuffer",
        });
        //destructure headers so i can know type of img
        //data is a buffer, but not Node buffer , it is a raw buffer that has not built in methods like toString
        return { data, mimeType: headers["content-type"] };
    }));
    const buffers = yield Promise.all(promises);
    const base64Imgs = buffers.map((buf, i) => ({
        url: urls[i],
        mimeType: buf.mimeType,
        base64: `data:${buf.mimeType};base64,${Buffer.from(buf.data).toString("base64")}`,
    }));
    return res.status(200).json({ success: true, base64Imgs });
}));
export default router;
