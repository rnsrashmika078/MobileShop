import Dashboard from "../components/ui/Dashboard/Dashboard";

interface Props {
    searchParams?: { page?: string; limit?: string };
}

const ProductsPage = async ({ searchParams }: Props) => {
    const pageNum = parseInt((searchParams && searchParams.page) || "1");
    const limit = parseInt((searchParams && searchParams.limit) || "10");

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${pageNum}&limit=${limit}`
    );
    const data = await res.json();
    const products = data.products || [];

    
    return (
        <div>
            <Dashboard products={products} />
        </div>
    );
};

export default ProductsPage;
