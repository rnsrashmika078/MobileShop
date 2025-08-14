"use server";

import connectDB from "./connectDB";
import Product from "./models/Product";
export async function AddNewProduct(formData: FormData) {
    // Function to add a new product
    const name = formData.get("name") as string;
    const price = Number(formData.get("price")) || 0;
    const color = formData.get("color") as string;
    const model = formData.get("model") as string;
    const category = formData.get("category") as string;
    const stock = Number(formData.get("stock")) || 0;
    const imagesString = formData.get("images") as string;
    const images = JSON.parse(imagesString);
    try {
        await connectDB(); //Connect to the database

        const newProduct = await Product.create({
            // Create a new product
            name,
            price,
            color,
            model,
            category,
            stock,
            images,
        });
        console.log(newProduct); // Debugging line to check the new product

        return {
            // Return the response
            success: true,
            newProduct: JSON.parse(JSON.stringify(newProduct)), // have to serialize the object to remove mongoose specific properties
            message: "Product added successfully",
        };
    } catch (error) {
        // Handle any errors that occur during the process
        return {
            success: false,
            message: "Server error",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}
