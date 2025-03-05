import mongoose from "mongoose";

const NonLoggedUserNewsLetterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedTokenToUnsubscribe: {
      type: String,
      default: null,
    },
    hashedTokenToResubscribe: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const NonLoggedUserNewsLetter =
  mongoose.models.NonLoggedUserNewsLetter ||
  mongoose.model("NonLoggedUserNewsLetter", NonLoggedUserNewsLetterSchema);

export default NonLoggedUserNewsLetter;
