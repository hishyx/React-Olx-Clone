import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, minlength: 10 },
  price: { type: Number, required: true, min: 0.01 },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isSold: { type: Boolean, default: false },
}, { timestamps: true });

export default model("Product", productSchema);
