"use client";
import SearchArea from "@/app/lib/Components/Basic/SearchArea";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
// import { GoBell } from "react-icons/go";

const MobileView = ({ toggle }: { toggle: boolean }) => {
    // const navitems = [
    //     { item: "Home" },
    //     { item: "Profile" },
    //     {
    //         item: (
    //             <SearchArea
    //                 radius="xs"
    //                 placeholder="What are you looking for?"
    //             />
    //         ),
    //     },
    // ];
    // { item: <GoBell size={20} /> },
    // { item: <Theme /> },

    // const mainNavItems = [
    //     { item: "HOME" },
    //     { item: "LATEST" },
    //     { item: "ACCESSORIES" },
    //     { item: "CONTACTS" },
    // ];
    const navitems = [
        {
            item: (
                <div className="flex justify-center items-center gap-2 w-[calc(140%)] -mx-5">
                    <SearchArea radius="xs" placeholder="Search..." />
                </div>
            ),
            index: 7,
        },
    ];
    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.2,
                staggerDirection: 1, // 1 = forward, -1 = reverse
            },
        },
        exit: {
            transition: {
                staggerChildren: 0.3,
                staggerDirection: -1, // animate out in reverse
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: 20, transition: { duration: 0.4 } },
    };
    return (
        <div>
            {toggle && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-3 -z-50"
                >
                    <div className="flex justify-between gap-5 items-center mt-2">
                        {navitems.map((item) => (
                            <motion.div
                                variants={itemVariants}
                                key={item.index}
                                className="text-gray-500 hover:cursor-pointer select-none hover:text-gray-300"
                            >
                                {item.item}
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 w-[calc(100%-50%)]"></div>
                </motion.div>
            )}
        </div>
    );
};
export default MobileView;
