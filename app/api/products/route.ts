import { NextResponse } from "next/server";
import { getAllProducts } from "@/app/action/getAllProducts";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url, "http://localhost");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "2");

    const result = await getAllProducts(page, limit);

    return NextResponse.json(result);
}
