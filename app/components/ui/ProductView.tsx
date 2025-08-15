"use client";
import { Product, LoadBody } from "@/types";
import Image from "next/image";
import Button from "./Button";
import { useEffect, useState } from "react";
import CustomBot from "../Ai/CustomBot";
import Spinner from "./Spinner";
const Productview: React.FC<{ product: Product }> = ({ product }) => {
    const [viewImage, setViewImage] = useState<number>(0);
    console.log("PRODUCT", product);
    const [turnAI, setTurnAI] = useState<boolean>(false);
    const [loading, setLoading] = useState<LoadBody | undefined>();
    const [aiResponse, setAIResponse] = useState<string>("");

    useEffect(() => {
        setTurnAI(true);
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            {product && (
                <>
                    <div className="flex flex-col md:flex-row gap-6 border border-gray-200  shadow-2xl rounded-xl p-5">
                        <div className="flex flex-col gap-5">
                            <Image
                                src={
                                    product.images?.[viewImage]?.secure_url ||
                                    "/noimage.jpg"
                                }
                                alt={
                                    product.images?.[viewImage]?.secure_url ||
                                    "image"
                                }
                                width={300}
                                height={300}
                                className="flex m-auto rounded-xl object-cover border-2 border-gray-300"
                            />
                            <div className="flex flex-row justify-center items-center gap-5 ">
                                <div className="flex flex-row  border-2 border-gray-300 rounded-xl ">
                                    <Image
                                        src={
                                            product.images?.[0]?.secure_url ||
                                            "/noimage.jpg"
                                        }
                                        alt={
                                            product.images?.[0]?.secure_url ||
                                            "image"
                                        }
                                        width={75}
                                        height={75}
                                        onClick={() => setViewImage(0)}
                                        className="flex m-auto rounded-xl object-cover"
                                    />
                                </div>
                                <div className="flex flex-row  border-2 border-gray-300 rounded-xl ">
                                    <Image
                                        src={
                                            product.images?.[1]?.secure_url ||
                                            "/noimage.jpg"
                                        }
                                        alt={
                                            product.images?.[1]?.secure_url ||
                                            "image"
                                        }
                                        width={75}
                                        height={75}
                                        onClick={() => setViewImage(1)}
                                        className="flex m-auto rounded-xl object-cover p-1"
                                    />
                                </div>
                            </div>
                            ‌
                        </div>

                        <div className="flex-1 space-y-3">
                            <h1 className="text-3xl font-bold">
                                {product.name}
                            </h1>
                            <p className="text-gray-600 text-lg">
                                {product.model}
                            </p>
                            <p className="text-blue-600 text-2xl font-semibold">
                                Rs {product.price?.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                                Category: {product.category}
                            </p>
                            <p className="text-sm text-gray-500">
                                Primary Color: {product.color}
                            </p>
                            <p className="text-sm text-gray-500">
                                In Stock: {product.stock}
                            </p>
                            <div className=" flex gap-2">
                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium transition"
                                    onClick={() => {
                                        const number = "940716600777";
                                        const message = encodeURIComponent(
                                            `Hi, I want to buy ${product.model} ${product.category}!`
                                        );
                                        window.open(
                                            `https://wa.me/${number}?text=${message}`,
                                            "_blank"
                                        );
                                    }}
                                >
                                    Message on WhatsApp
                                </Button>
                                <Button
                                    onClick={() => {
                                        window.open("tel:+94712345678");
                                    }}
                                >
                                    Call Us
                                </Button>
                            </div>
                            <div className="mt-5">
                                <h2 className="text-xl font-semibold">
                                    📝 Description:
                                </h2>

                                {/* <CustomBot
                                    products={product}
                                    setAIResponse={setAIResponse}
                                    turn={turnAI}
                                    setLoading={setLoading}
                                    customPrompt={`Generate Descripton short with the given product details: ${JSON.stringify(
                                        product
                                    )} currency is sri lankan rupee`}
                                /> */}

                                {/* {loading?.loading ? (
                                    <div className="flex justify-center mt-5">
                                        {" "}
                                        <Spinner />
                                    </div>
                                ) : (
                                    <p className="text-gray-700 mt-2">
                                        {aiResponse}
                                    </p>
                                )} */}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Productview;
