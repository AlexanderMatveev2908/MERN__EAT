import { v2 } from "cloudinary";
import fs from "fs";

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
