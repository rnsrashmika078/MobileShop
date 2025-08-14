import React, { useEffect, useRef } from "react";
import { Card } from "../../Card";
import { Product } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useInView } from "framer-motion";
import Spinner from "../../Spinner";
interface Props {
    paginatedProducts: Product[];
    setIsInView: React.Dispatch<React.SetStateAction<boolean>>;
    length: number;
}
const BackCovers = ({ paginatedProducts, setIsInView, length }: Props) => {
    const router = useRouter();
    const endRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(endRef, { margin: "-10% 0px -10% 0px" });
    useEffect(() => {
        setIsInView(isInView);
    }, [isInView, setIsInView]);

    const filtered = paginatedProducts.filter(
        (product) => product.category === "Backcovers"
    );

    console.log(filtered);
    return (
        <div className="flex flex-col items-center justify-center mt-16 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide mb-2">
                Mobile BackCovers
            </h1>
            <p className="text-gray-500 text-lg max-w-xl">
                Protect your phone in style with our latest collection of trendy
                and durable backcovers.
            </p>

            <div
                className={`${
                    filtered.length > 0
                        ? "grid grid-cols-1  p-5  gap-y-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 "
                        : "grid grid-cols-1"
                } `}
            >
                {filtered && filtered.length > 0 ? (
                    filtered.map((product, index) => (
                        <Card
                            onClickCapture={() =>
                                router.push(`/product/${product._id}`)
                            }
                            key={index}
                            product={product}
                            // handleDelete={handleDelete}
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
                <h1>You have Reached To End!</h1>
            )}
        </div>
    );
};
export default BackCovers;
