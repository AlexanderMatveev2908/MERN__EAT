import { v2 } from "cloudinary";

export const uploadCloud = (files: any): Promise<any> => {
  console.log(files);

  const promises = files?.restaurantsImages.map(async (file: any) => {
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
