"use server";
import connectDB from "./connectDB";
import Product from "./models/Product";
export async function getAllProducts(page = 1, limit = 2) {
    // Function to get all products
    try {
        await connectDB();

        const skip = (page - 1) * limit;

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
