"use server";
import { NextResponse } from "next/server";
import connectDB from "./connectDB";
import Product from "./models/Product";
import { v2 as cloudinary } from "cloudinary";
import { ImgProperty } from "@/types";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function DeleteProduct(id: string, productImage: ImgProperty[]) {
  try {
    await connectDB();
    console.log(
      "product image public id to be deleted",
      JSON.stringify(productImage)
    );
    for (const img of productImage) {
      await cloudinary.uploader.destroy(img.public_id);
    }
    await Product.findByIdAndDelete(id);
    return {
      success: true,
      message: "Successfully Deleted!",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
