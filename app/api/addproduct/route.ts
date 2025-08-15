// /app/api/addproduct/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/action/connectDB";
import { AddNewProduct } from "@/app/action/AddNewProduct";

export async function POST(req: Request) {
  await connectDB();
  
  const token = req.headers
    .get("cookie")
    ?.split("admin_token=")[1]
    ?.split(";")[0];

  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if ((decoded as any).role !== "admin")
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const response = await AddNewProduct(body);

    if (response.success) {
      return NextResponse.json({ success: true, message: "Product added" });
    }
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}
