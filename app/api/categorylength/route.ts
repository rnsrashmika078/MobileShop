import { NextResponse } from "next/server";
import { getCategoryLength } from "@/app/action/getAllProducts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url, "http://localhost");
  const category = searchParams.get("category");

  let result = null;
  if (!category) {
    result = await getCategoryLength("");
    return NextResponse.json(result);
  }

  result = await getCategoryLength(category);
  return NextResponse.json(result);
}
