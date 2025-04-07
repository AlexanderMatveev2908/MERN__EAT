import axios from "axios";
import { v2 } from "cloudinary";
import fs from "fs";
import streamifier from "streamifier";

export const uploadCloud = (files: any): Promise<any> => {
  const promises = files?.restaurantImages.map(async (file: any) => {
    const b64 = file.buffer.toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + b64;

    const res = await v2.uploader.upload(dataURI, {
      resource_type: "auto",
      folder: "food_app",
    });

    return { public_id: res.public_id, url: res.secure_url };
  });

  return Promise.all(promises);
};

export const deleteCloud = async (public_id: string) =>
  await v2.uploader.destroy(public_id);

export const uploadCloudStorage = (files: any) => {
  const promises = files.map(async (file: any) => {
    const res = await v2.uploader.upload(file.path, {
      resource_type: "auto",
      folder: "dishes",
    });

    for (const file of files) {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    }

    return { public_id: res.public_id, url: res.secure_url };
  });

  return Promise.all(promises);
};

export const uploadUpdateDish = (files: any): Promise<any> => {
  const promises = files.map(async (file: any) => {
    const b64 = file.buffer.toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + b64;

    const res = await v2.uploader.upload(dataURI, {
      resource_type: "auto",
      folder: "dishes",
    });
    return { public_id: res.public_id, url: res.secure_url };
  });

  return Promise.all(promises);
};

export const uploadCloudURL = async (urlCloud: string) => {
  // we could simply upload img by url existent, i used stream here just for study purposes
  const res = await axios.get(urlCloud, { responseType: "arraybuffer" });
  const buffer = Buffer.from(res.data, "binary");

  return new Promise((res, rej) => {
    const uploadStream = v2.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "orders",
      },
      (err, result) => {
        if (err) rej(err);
        const { public_id, secure_url: url } = result as any;
        res({ public_id, url });
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};
