import React, { useEffect, useRef, useState } from "react";
import { Card } from "../../Card";
import { ImgProperty, Product } from "@/types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useInView } from "framer-motion";
import Spinner from "../../Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { DeleteProduct } from "@/app/action/DeleteProduct";
import { setSimpleNotification } from "@/redux/NotifySlicer";
interface Props {
  paginatedProducts: Product[];
  setIsInView: React.Dispatch<React.SetStateAction<boolean>>;
  setPaginatedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
const ShowProduct = ({
  paginatedProducts,
  setIsInView,
  setPaginatedProducts,
}: Props) => {
  const router = useRouter();
  const endRef = useRef<HTMLDivElement | null>(null);
  const [length, setLength] = useState<number>(0);
  const [header, setHeader] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const isInView = useInView(endRef, {
    // rootMargin: "-10% 0px -10% 0px",
    // once: false,  set to true if you only want to trigger once
  });

  const category = useSelector((store: RootState) => store.product.category);
  useEffect(() => {
    setIsInView(isInView);
  }, [isInView, setIsInView]);

  const currentPath = usePathname();
  useEffect(() => {
    if (header) {
      const getLength = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categorylength?category=${
            header === "Home"
              ? ""
              : header.toLowerCase().startsWith("tempered")
              ? "Tempered Glass"
              : header
          }`
        );
        if (res.ok) {
          const data = await res.json();
          setLength(data.length);
        }
      };
      getLength();
    }
  }, [category, header, paginatedProducts]);

  const handleDelete = async (_id: string, productImage: ImgProperty[]) => {
    setLoading(true);

    try {
      const data = await DeleteProduct(_id, productImage);
      if (data) {
        dispatch(setSimpleNotification({ simpleMessage: data.message }));
        setLoading(false);
        setPaginatedProducts((prev) => prev.filter((p) => p._id !== _id));
      }
    } catch (error) {
      alert(error);
    }
  };

  const description: Record<string, string> = {
    All: "Check out the newest arrivals in our store – fresh picks just for you!",
    Backcovers:
      "Protect your phone in style with our premium backcovers – sleek, durable, and made for you.",
    TemperedGlass:
      "Keep your screen flawless with our ultra-clear, high-strength tempered glass protectors.",
  };

  useEffect(() => {
    const header =
      currentPath.split("/")[1].charAt(0).toUpperCase() +
      currentPath.split("/")[1].slice(1, currentPath.length);
    setHeader(header);
  }, [currentPath]);
  return (
    <div className="flex flex-col items-center justify-center mt-16 text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide mb-2">
        {currentPath.startsWith("/home")
          ? "LATEST PRODUCTS"
          : header.toLowerCase().startsWith("temp")
          ? "Tempered Glass"
          : header}
      </h1>
      <p className="text-gray-500 text-lg max-w-xl">
        {currentPath.startsWith("/home")
          ? description["All"]
          : description[header]}
      </p>
      <div
        className={`${
          paginatedProducts.length > 0
            ? "grid grid-cols-1  p-5  gap-y-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 "
            : "grid grid-cols-1"
        } `}
      >
        {paginatedProducts && paginatedProducts.length > 0 ? (
          paginatedProducts.map((product, index) => (
            <Card
              onClick={() => router.push(`/product/${product._id}`)}
              key={index}
              product={product}
              loadingState={loading}
              handleDelete={handleDelete}
              // handleEdit={handleEdit}
              className="p-4 bg-white space-y-2 shadow-md hover:shadow-lg transition"
            ></Card>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center p-5 text-center">
            <Image
              src={"/noproduct.png"}
              alt="no product"
              width={200}
              height={200}
              className=""
            />
            NO PRODUCTS AT THE MOMENT!
          </div>
        )}
      </div>
      {length != paginatedProducts.length ? (
        <div ref={endRef} className="h-10">
          <Spinner />
        </div>
      ) : (
        <h1 className="border p-2 border-gray-200 shadow-sm rounded-sm">
          You’re all caught up 🎉
        </h1>
      )}
    </div>
  );
};

export default ShowProduct;
