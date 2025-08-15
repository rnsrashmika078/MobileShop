"use server";

import connectDB from "./connectDB";
import Product from "./models/Product";

export type ProductData = {
  name: string;
  price: number;
  color: string;
  model: string;
  category: string;
  stock: number;
  images: string[];
};

export async function AddNewProduct(data: ProductData) {
  const { name, price, color, model, category, stock, images } = data;

  try {
    await connectDB();

    const newProduct = await Product.create({
      name,
      price,
      color,
      model,
      category,
      stock,
      images,
    });

    console.log("New product added:", newProduct);

    return {
      success: true,
      newProduct: JSON.parse(JSON.stringify(newProduct)),
      message: "Product added successfully",
    };
  } catch (error) {
    console.error("Error adding product:", error);

    return {
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
