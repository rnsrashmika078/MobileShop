import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: Request) {
  const token = req.headers
    .get("cookie")
    ?.split("admin_token=")[1]
    ?.split(";")[0];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if ((decoded as any).role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }

  return NextResponse.next();
}

// Protect only API routes for mutations
export const config = {
  matcher: ["/api/addproduct", "/api/deleteproduct/:path*"],
};
// middleware.js
