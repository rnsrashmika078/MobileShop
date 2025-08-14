import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    images: [
      {
        secure_url: { type: String, required: false },
        public_id: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.models.Product || mongoose.model("Product", productSchema);
