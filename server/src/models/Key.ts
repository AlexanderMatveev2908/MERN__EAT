import mongoose from "mongoose";

const KeySchema = new mongoose.Schema({
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
  iV: {
    type: String,
    required: true,
  },
});

const Key = mongoose.models.Key || mongoose.model("Key", KeySchema);

export default Key;
