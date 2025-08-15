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
import { useRouter } from "next/navigation";
import { setSimpleNotification, setToken } from "@/redux/NotifySlicer";
import Button from "../Button";
import Input from "../Input";
import { Select, SelectItem } from "../Select";
import CustomBot from "../../Ai/CustomBot";
import { Card } from "../Card";
import Link from "next/link";
import FloatingObject from "../FloatingObject";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import ShowProduct from "../Category/Latest/ShowProduct";
import { DeleteProduct } from "@/app/action/DeleteProduct";
// import Category from "./Category/Category";

interface SL {
  _id: string;
}
interface Props {
  products: Product[];
  token: string;
}
const Dashboard: React.FC<Props> = ({ products, token }) => {
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
  const dispatch = useDispatch<AppDispatch>();

  async function loadMore() {
    const nextPage = page + 1;
    const res = await fetch(`/api/products?page=${nextPage}&limit=10`);
    const data = await res.json();
    setPaginatedProducts((prev) => [...prev, ...data["products"]]);
    setPage(nextPage);
  }

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch, token]);

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

  const router = useRouter();

  // handle Delete
  // const handleDelete = async (_id: string, productImage: ImgProperty[]) => {
  //   setLoading({ type: "DELETE", loading: true });

  //   try {
  //     const data = await DeleteProduct(_id, productImage);
  //     if (data) {
  //       dispatch(setSimpleNotification({ simpleMessage: data.message }));
  //       // router.push("/home");
  //       setLoading({ type: "Delete", loading: false });
  //       setPaginatedProducts((prev) => prev.filter((p) => p._id !== _id));
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

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
      <Category />
      <ShowProduct
        setPaginatedProducts={setPaginatedProducts}
        paginatedProducts={paginatedProducts}
        setIsInView={setIsInView}
      />
      <FloatingObject />
    </div>
  );
};

export default Dashboard;

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
