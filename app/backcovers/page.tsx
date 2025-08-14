import React from "react";
import BackCovers from "../components/ui/Category/Backcovers/BackCovers";
interface Props {
  searchParams?: { page?: string; limit?: string };
}
const page = async (props: Props) => {
  const resolvedSearchParams = await props.searchParams; // ✅ await first

  const pageNum = parseInt(
    (resolvedSearchParams && resolvedSearchParams.page) || "1"
  );
  const limit = parseInt(
    (resolvedSearchParams && resolvedSearchParams.limit) || "10"
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${pageNum}&limit=${limit}&category=Backcovers`
  );
  const data = await res.json();
  const products = data.products || [];

  return (
    <div>
      <BackCovers products={products} />
    </div>
  );
};

export default page;
