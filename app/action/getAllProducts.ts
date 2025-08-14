"use server";
import connectDB from "./connectDB";
import Product from "./models/Product";
export async function getAllProducts(
  page: number,
  limit: number,
  category?: string
) {
  // Function to get all products
  try {
    await connectDB();

    const skip = (page - 1) * limit;
    if (category) {
      const products = await Product.find({ category })
        .skip(skip)
        .limit(limit)
        .select("name price images category color"); // only needed fields

      const total = await Product.countDocuments();

      return {
        success: true,
        products,
        length: total,
        // hasMore: skip + limit < total,
      };
    }

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .select("name price images category color"); // only needed fields

    const total = await Product.countDocuments();

    return {
      success: true,
      products,
      length: total,
      // hasMore: skip + limit < total,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getCategoryLength(category: string) {
  try {
    await connectDB();
    let total = 0;
    if (category === "") {
      total = await Product.countDocuments();
      return {
        length: total,
      };
    }
    total = await Product.countDocuments({ category });
    return {
      length: total,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
