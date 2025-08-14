import React from "react";
import Dashboard from "../components/ui/Dashboard/Dashboard";
interface Props {
    searchParams?: { page?: string; limit?: string };
}
const page = async (props: Props) => {
    const resolvedSearchParams = await props.searchParams; // ✅ await first

    const pageNum = parseInt(
        (resolvedSearchParams && resolvedSearchParams.page) || "1"
    );
    const limit = parseInt(
        (resolvedSearchParams && resolvedSearchParams.limit) || "5"
    );

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${pageNum}&limit=${limit}`
    );
    const data = await res.json();
    const products = data.products || [];
    const length = data.length;

    return (
        <div>
            <Dashboard products={products} length={length} />
        </div>
    );
};

export default page;
