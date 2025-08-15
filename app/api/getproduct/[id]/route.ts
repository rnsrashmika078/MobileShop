// app/api/auth/getproduct/[id]/route.ts
import { getProduct } from "@/app/action/getProduct";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const result = await getProduct(params.id);
  return NextResponse.json(result);
}
