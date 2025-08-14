"use client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaCircleChevronRight } from "react-icons/fa6";
const Banner = () => {
    const dynamicBanners = [
        "/banner.png",
        "/banner2.png",
        "/banner3.jpg",
        "/banner4.jpg",
    ];
    const [trackIndex, setTrackIndex] = useState<number>(0);
    useEffect(() => {
        const BannerChanges = async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            setTrackIndex((prevIndex) => {
                if (prevIndex < dynamicBanners.length - 1) {
                    return prevIndex + 1;
                } else {
                    return 0; 
                }
            });
        };
        BannerChanges();
    }, [dynamicBanners.length, trackIndex]);

    return (
        <AnimatePresence>
            <section className="text-white  py-0 px-0 text-center shadow-md h-[400px] w-full relative overflow-hidden">
                <Image
                    src={`${dynamicBanners[trackIndex] || dynamicBanners[0]}`}
                    alt="MobileStore Banner"
                    fill
                    className="object-cover"
                />
                <button
                    className="absolute top-1/2 left-5 z-10 text-black transition duration-300  hover:scale-120"
                    onClick={() => {
                        if (trackIndex < dynamicBanners.length - 1) {
                            setTrackIndex(trackIndex + 1);
                        } else {
                            setTrackIndex(0);
                        }
                    }}
                >
                    <FaChevronCircleLeft size={35} />
                </button>
                <button
                    className="absolute top-1/2 right-5 z-10 text-black transition duration-300 hover:scale-120"
                    onClick={() => {
                        if (trackIndex <= 0) {
                            setTrackIndex(dynamicBanners.length - 1);
                        } else {
                            setTrackIndex(trackIndex - 1);
                        }
                    }}
                >
                    <FaCircleChevronRight size={35} />
                </button>
            </section>
        </AnimatePresence>
    );
};

export default Banner;
