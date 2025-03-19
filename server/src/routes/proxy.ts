import express, { Request, Response } from "express";
import { badRequest } from "../utils/baseErrResponse.js";
import axios from "axios";

const router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const { urls } = req.body;
  if (!Array.isArray(urls) || !urls?.length) return badRequest(res);

  const promises = urls.map(async (url) => {
    const { data, headers } = await axios.get(url, {
      responseType: "arraybuffer",
    });
    //destructure headers so i can know type of img
    //data is a buffer, but not Node buffer , it is a raw buffer that has not built in methods like toString

    return { data, mimeType: headers["content-type"] };
  });

  const buffers = await Promise.all(promises);

  const base64Imgs = buffers.map((buf, i) => ({
    url: urls[i],
    mimeType: buf.mimeType,
    base64: `data:${buf.mimeType};base64,${Buffer.from(buf.data).toString(
      "base64"
    )}`,
  }));

  return res.status(200).json({ success: true, base64Imgs });
});

export default router;
