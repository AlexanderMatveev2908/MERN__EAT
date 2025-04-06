import mongoose from "mongoose";

export type ImageType = {
  url: string;
  public_id: string;
  _id?: string;
};

export const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
});
