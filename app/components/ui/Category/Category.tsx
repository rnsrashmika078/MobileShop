"use client";
import React from "react";
import Image from "next/image";

const Category = () => {
    const categories = [
        { category: "Backcovers", image: "/ProductImages/a (16).jpg" },
        { category: "Tempered Glass", image: "/ProductImages/a (15).jpg" },
        { category: "Chargers", image: "/ProductImages/a (4).jpg" },
        { category: "Pen Drives", image: "/ProductImages/a (18).jpg" },
        { category: "Earphones", image: "/ProductImages/a (26).jpg" },
        { category: "Headphones", image: "/ProductImages/a (2).png" },
        { category: "Earbuds", image: "/ProductImages/a (27).jpg" },
        { category: "Speakers", image: "/ProductImages/a (10).jpg" },
        { category: "Smart Watch", image: "/ProductImages/a (3).png" },
    ];

    type HoverTypes = {
        hover: boolean;
        category: string;
    };
    const [hover, setHover] = React.useState<HoverTypes>();

    return (
        <div>
            <div className="flex flex-col items-center justify-center mt-16 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide mb-2">
                    ALL CATEGORIES
                </h1>
                <p className="text-sm sm:text-md md:text-lg text-gray-500 max-w-xl">
                    Explore all the product categories we offer – find what
                    suits your needs!
                </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 p-4 bg-gray-100 mt-5">
                {categories.map((item, index) => (
                    <div
                        onMouseEnter={() =>
                            setHover({ hover: true, category: item.category })
                        }
                        onMouseLeave={() =>
                            setHover({ hover: false, category: item.category })
                        }
                        key={index}
                        className="relative bg-white shadow-md rounded-lg overflow-hidden w-50 h-50 text-center"
                    >
                        <Image
                            src={item.image}
                            alt={item.category}
                            fill
                            className="object-cover"
                        />
                        <div
                            className={`rounded-2xl shadow-sm border border-gray-200  absolute ${
                                hover?.hover && hover.category === item.category
                                    ? "opacity-100"
                                    : "opacity-0"
                            } bottom-3 left-1/2 -translate-x-1/2 -translate-y-0 bg-white p-2 text-lg font-semibold text-gray-800`}
                        >
                            {item.category}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
