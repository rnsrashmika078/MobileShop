"use client";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import MobileView from "./MobileView";
import { motion } from "framer-motion";
import { GoBell } from "react-icons/go";
import useScreenSize from "@/app/hooks/useScreenSize";
import SearchArea from "@/app/lib/Components/Basic/SearchArea";
import Image from "next/image";
import { setCategory } from "@/redux/Products";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
const NavBar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const width = useScreenSize();
  const [hover, setHover] = useState<string | null>(null);
  useEffect(() => {
    if (width > 480) {
      setToggle(false);
    }
  }, [width]);

  const navitems = [, { item: <GoBell size={20} />, index: 6 }];
  const mainNavItems = [
    { item: "HOME", index: 1 },
    { item: "LATEST", index: 2 },
    { item: "ALL ACCESSORIES", index: 3 },
    { item: "CONTACTS", index: 4 },
  ];
  const itemVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: -7, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.4 } },
  };
  const mainTextVariant = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    exit: { opacity: 0, y: 20, transition: { duration: 1 } },
  };

  const [path, setPath] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;

      if (path === "/") {
        setPath(path);
      }
    }
  }, []);
  const router = useRouter();

  if (typeof window !== "undefined" && path === "/") return;

  return (
    // 4rem = 64px = 16 tailwind points
    <div className="sticky top-0 z-[9998] bg-white">
      <div className=" hidden md:flex gap-5 justify-between p-2 bg-gray-200 text-gray-500 text-xs px-10 ">
        <p className="">Latest Mobile Accessories</p>
        <div className="flex gap-5">
          <p>071 6600777</p>
          <p>rnsrashmika078@gmail.com</p>
        </div>
      </div>
      <div className="z-[9999] h-[4rem] flex justify-between p-5 sticky top-0  select-none shadow-2xs bg-[var(--navbar)] mx-0 md:mx-25">
        <div className="flex justify-center  gap-3 items-center mt-2">
          <div>
            {" "}
            <Image
              src="/next.svg"
              width={50}
              height={50}
              alt="site logo"
            ></Image>
          </div>
          <motion.h1
            variants={mainTextVariant}
            initial="visible"
            animate={`${!toggle ? "visible" : "hidden"}`}
            exit="exit"
            className={`${!toggle ? "opacity-100" : "opacity-0"} text-2xl`}
          >
            <div className="hidden md:flex justify-center items-center gap-3">
              <div className="flex md:flex justify-center items-center">
                MobileStore
              </div>
            </div>
          </motion.h1>
        </div>
        <div className="hidden sm:flex justify-center items-center gap-2 w-[calc(100%-50%)]">
          <SearchArea radius="xs" placeholder="Search..." />
        </div>
        <div className="hidden sm:flex justify-between gap-5 items-center text-gray-200 text-sm font-extralight">
          {navitems.map((item) => (
            <div
              key={item?.index}
              className="relative text-gray-500 hover:cursor-pointer select-none hover:text-gray-300 transition-all duration-200"
            >
              {item?.item}
            </div>
          ))}
        </div>
        <div className="transition-all flex sm:hidden">
          <CiMenuBurger
            size={20}
            color="gray"
            onClick={() => setToggle((prev) => !prev)}
          />

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // bg-[var(--mobile-nav)]
            className=" fixed top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 rounded-full "
          >
            <MobileView toggle={toggle} />
          </motion.div>
        </div>
      </div>

      <div
        className={`relative transition-all duration-600 ${
          toggle ? "flex" : "hidden md:flex"
        }absolute w-full sm:flex gap-5 bg-blue-500 p-3 space-y-3 sm:space-y-0 justify-center items-center text-[17px]`}
      >
        {mainNavItems.map((item) => (
          <div
            key={item.index}
            className="text-white font-extralight hover:cursor-pointer select-none hover:text-gray-300 transition-all duration-200"
            onClick={() =>
              item.item !== "ALL ACCESSORIES" &&
              router.push(`/${item.item.toLowerCase()}`)
            }
          >
            <h1 onMouseEnter={() => setHover(item.item)}>{item.item}</h1>
          </div>
        ))}
        {hover && hover === "ALL ACCESSORIES" && (
          <div
            className="top-14 absolute translate-x-6 z-[9999]"
            onMouseLeave={() => setHover(null)}
          >
            <CategoryList />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

const CategoryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const list = ["Backcovers", "Tempered Glass"];
  return (
    <div className="flex gap-1 flex-col bg-white border border-gray-200 shadow-sm rounded-sm w-38 p-3">
      <h1 className="text-blue-500">Categories</h1>
      <hr className="mb-2 text-gray-300"></hr>
      {list.map((item, index) => (
        <ul
          key={index}
          className="cursor-pointer hover:text-gray-400 text-sm flex  flex-col text-black"
        >
          <li
            onClick={() => {
              dispatch(setCategory(item));
              router.push(item.split(" ").join("").toLowerCase());
            }}
          >
            {item}
          </li>
        </ul>
      ))}
    </div>
  );
};
