"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
// import { Card } from "./Card";
// import { Select, SelectItem } from "./Select";
// import Input from "./Input";
import axios from "axios";
import { ImgProperty } from "@/types";
import { Product, LoadBody } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setEditProduct } from "@/redux/Products";
import { usePathname, useRouter } from "next/navigation";
import { setSimpleNotification } from "@/redux/NotifySlicer";
// import Button from "../Button";
// import Input from "../Input";
// import { Select, SelectItem } from "../Select";
// import CustomBot from "../../Ai/CustomBot";
// import { Card } from "../Card";
// import Link from "next/link";

import ShowProduct from "../Latest/ShowProduct";
import FloatingObject from "../../FloatingObject";
import Banner from "../../Banner/Banner";

// import Category from "./Category/Category";

interface SL {
  _id: string;
}
interface Props {
  products: Product[];
}
const BackCovers: React.FC<Props> = ({ products }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [aiResponse, setAIResponse] = useState<string>("");
  const [loading, setLoading] = useState<LoadBody>();
  const [turnAI, setTurnAI] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [serachList, setSearchList] = useState<SL[]>([]);
  const [paginatedProducts, setPaginatedProducts] =
    useState<Product[]>(products);
  const [page, setPage] = useState(1);
  const [isInView, setIsInView] = useState<boolean>(false);

  const [header, setHeader] = useState<string>("");
  const currentPath = usePathname();
  useEffect(() => {
    const header =
      currentPath.split("/")[1].charAt(0).toUpperCase() +
      currentPath.split("/")[1].slice(1, currentPath.length);
    setHeader(header);
  }, [currentPath]);

  async function loadMore() {
    const nextPage = page + 1;
    const res = await fetch(
      `/api/products?page=${nextPage}&limit=10&category=Backcovers`
    );
    const data = await res.json();
    setPaginatedProducts((prev) => [...prev, ...data["products"]]);
    setPage(nextPage);
  }

  useEffect(() => {
    if (isInView) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  useEffect(() => {
    if (aiResponse) {
      const data = JSON.parse(aiResponse);
      if (data) {
        setSearchList(data);
      } else {
        return setSearchList([]);
      }
    }
  }, [aiResponse]);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // handle Delete
  const handleDelete = async (_id: string, productImage: ImgProperty[]) => {
    setLoading({ type: "DELETE", loading: true });

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/auth/deletePost/${_id}`,
        {
          data: productImage.map((image) => image.public_id),
        }
      );
      if (res.status === 200) {
        dispatch(setSimpleNotification({ simpleMessage: res.data.message }));
        setLoading({ type: "Delete", loading: false });
        router.push("/home");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleEdit = (product: Product) => {
    dispatch(setEditProduct(product));
    router.push("/addproduct");
  };

  useEffect(() => {
    dispatch(setEditProduct(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; //this gives the number of pixels that the document has already been scrolled vertically
      const windowHeight = window.innerHeight; //get the height of the browser window
      //this gives the total height of the document, including the part that is not visible in the viewport
      const documentHeight = document.documentElement.scrollHeight;

      // Check if the user has scrolled to the bottom
      if (scrollTop + windowHeight >= documentHeight - 1) {
        // loadMore();
        // You can trigger any action here, such as loading more products
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="p-4 space-y-4">
      <Banner />
      <ShowProduct
        paginatedProducts={paginatedProducts}
        setIsInView={setIsInView}
      />
      {/* {category === "backcovers" && (
                <LatestProduct
                    length={length}
                    paginatedProducts={paginatedProducts}
                    setIsInView={setIsInView}
                />
            )} */}

      {/* <BackCovers
                paginatedProducts={paginatedProducts}
                setIsInView={setIsInView}
                length={length}
            /> */}
      {/* <ProductPage /> */}
      {/* <div
                className={`${
                    turnAI ? "Slide-From-Top" : "Slide-Back"
                } w-full max-w-md fixed -top-5 left-1/2 -translate-x-1/2 z-[9999] p-4 `}
            >
                <div className="bg-gradient-animated-version text-white  px-6 py-4 rounded-b-2xl shadow-lg text-center">
                    <h2 className="text-xl font-bold">
                        AI-Based Search Enabled
                    </h2>
                    <Button variant="outline" onClick={() => setTurnAI(false)}>
                        Turn Off
                    </Button>
                </div>
            </div>
            {turnAI && <AISearchInfo />}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-white rounded-xl shadow-sm">
                <Input
                    placeholder="Search product, models..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="relative w-full"
                />
                <Select
                    value={category}
                    onValueChange={setCategory}
                    className="w-full"
                >
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Backcovers">Backcovers</SelectItem>
                    <SelectItem value="Tempered Glass">
                        Tempered Glass
                    </SelectItem>
                    <SelectItem value="Chargers">Chargers</SelectItem>
                    <SelectItem value="Mobiles">Mobiles</SelectItem>
                </Select>

                <Select
                    value={sortBy}
                    onValueChange={setSortBy}
                    className="w-full"
                >
                    <SelectItem value="latest">Newest Arrivals</SelectItem>
                    <SelectItem value="priceLow">Price: Low to High</SelectItem>
                    <SelectItem value="priceHigh">
                        Price: High to Low
                    </SelectItem>
                    <SelectItem value="stockHigh">
                        Stock: High to Low
                    </SelectItem>
                </Select>

                <div className="flex gap-2 w-full">
                    <Button
                        variant="gradient"
                        className="flex-1"
                        onClick={() =>
                            turnAI ? handleSearch() : setTurnAI((prev) => !prev)
                        }
                    >
                        {turnAI ? "Search" : "Enable AI"}
                    </Button>
                    <Button
                        variant="default"
                        className="flex-1"
                        onClick={() => router.push("/addproduct")}
                    >
                        Add Product
                    </Button>
                </div>
            </div> */}
      {/* 
            <CustomBot
                products={products}
                setAIResponse={setAIResponse}
                turn={turnAI}
                setLoading={setLoading}
                prompt={prompt}
                customPrompt={null}
            />
            <div className="pl-5 font-bold bg-gradient-animated w-40 text-white rounded-2xl p-1">
                {category.length === 0 ? "ALL CATEGORIES" : category}
            </div> */}

      <FloatingObject />
    </div>
  );
};

export default BackCovers;

const AISearchInfo = () => {
  return (
    <div className="flex flex-col justify-between bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md shadow-sm">
      <h2 className="text-2xl font-bold text-blue-700 mb-2 -mt-2">
        AI-Based Search Enabled
      </h2>
      <p className="text-gray-700 mb-1">🔍 Powered by Gemini AI</p>
      <p className="text-gray-600 mb-1">You can now search naturally, like:</p>
      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
        <li>“Show me iPhone 11 covers”</li>
        <li>“Do you have fast chargers?”</li>
        <li>“Tempered glass for Samsung?”</li>
      </ul>
      <p className="text-sm text-gray-500 mt-2">
        Just type your request in the search bar!
      </p>
    </div>
  );
};
