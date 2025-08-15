import React from "react";
import AddProduct from "../components/ui/AddProduct";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const token = (await cookies()).get("admin_token")?.value;

  if (!token) {
    // Server-side redirect to login
    redirect(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
  }

  return (
    <div>
      <AddProduct />
    </div>
  );
};

export default Page;
