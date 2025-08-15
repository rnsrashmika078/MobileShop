"use server";
import connectDB from "./connectDB";
import Product from "./models/Product";
export async function getProduct(_id: string) {
  try {
    await connectDB();

    const product = await Product.findById(_id);
    console.log("PRODUCTS ", product);
    if (product) {
      return {
        success: true,
        product,
        message: "Product found successfully!",
      };
    }
    return {
      success: false,
      product: null,
      message: "Product not found!",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
