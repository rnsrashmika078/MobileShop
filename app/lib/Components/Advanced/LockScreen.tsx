import React from "react";
import Image from "next/image";
const LockScreen = () => {
    return (
        <section>
            <div
                className="h-screen blur-xl"
                style={{
                    backgroundImage: 'url("/banner3.jpg")',
                    objectFit: "contain",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
            <div className="flex flex-col  absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex justify-center">
                    <Image
                        src="/noimage.jpg"
                        alt="bgimage"
                        width={250}
                        height={250}
                        className="w-50 h-50 rounded-full border border-gray-200 flex justify-center items-center "
                    />
                </div>
                <h1 className="text-3xl font-bold mt-5 text-center font-stretch-50% text0whir text-white">
                    Rashmika Siriwardhana
                </h1>
                <input
                    placeholder="PIN"
                    className="text-white border placeholder:text-white border-gray-400  bg-gray-800 rounded-sm p-2 mt-8 border-b-2 shadow-sm shadow-[#4dfffc] border-b-[#4dfffc]"
                ></input>
                <p className="text-center mt-10 font-extralight">I forget my PIN</p>
            </div>
        </section>
    );
};

export default LockScreen;
