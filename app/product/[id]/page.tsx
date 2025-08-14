import Productview from "@/app/components/ui/ProductView";

const DynamicRoute = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/api/auth/getproduct/${id}`, {
        cache: "no-store",
    });

    const data = await res.json();
 

    return (
        <div>
            <Productview product={data?.product} />
        </div>
    );
};

export default DynamicRoute;
