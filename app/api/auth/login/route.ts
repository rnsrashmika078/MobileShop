import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET!, {
      expiresIn: "2h",
    });

    // Store token in HTTP-only cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60, // 2 hours
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: "Unauthorized" },
    { status: 401 }
  );
}
