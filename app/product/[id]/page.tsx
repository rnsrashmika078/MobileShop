import Productview from "@/app/components/ui/ProductView";

const DynamicRoute = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getproduct/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
  }

  const data = await res.json();

  return (
    <div>
      <Productview product={data?.product} />
    </div>
  );
};

export default DynamicRoute;
