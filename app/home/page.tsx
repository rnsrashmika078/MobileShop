import React from "react";
import Dashboard from "../components/ui/Dashboard/Dashboard";
import { cookies } from "next/headers";

interface Props {
  searchParams?: { page?: string; limit?: string };
}
const page = async (props: Props) => {
  const resolvedSearchParams = await props.searchParams;

  const pageNum = parseInt(
    (resolvedSearchParams && resolvedSearchParams.page) || "1"
  );
  const limit = parseInt(
    (resolvedSearchParams && resolvedSearchParams.limit) || "10"
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${pageNum}&limit=${limit}`
  );
  const data = await res.json();
  const products = data.products || [];

  const token = (await cookies()).get("admin_token")?.value;

  if (!token) {
    // redirect(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
  }
  return (
    <div>
      <Dashboard products={products} token={token!} />
    </div>
  );
};
export default page;
