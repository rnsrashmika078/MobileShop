"use client";
import React, { useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Calender = () => {
    const daysOfWeek = [
        { day: "Su" },
        { day: "Mo" },
        { day: "Tu" },
        { day: "We" },
        { day: "Th" },
        { day: "Fr" },
        { day: "Sa" },
        { week1: 27 },
        { week1: 28 },
        { week1: 29 },
        { week1: 30 },
        { week1: 31 },
        { week1: 1 },
        { week1: 2 },
        { week2: 3},
        { week2: 4 },
        { week3: 5 },
        { week3: 6 },
        { week3: 7 },
        { week3: 8 },
        { week3: 9 },
        { week3: 10 },
        { week3: 11 },
        { week4: 12 },
        { week4: 13 },
        { week4: 14 },
        { week4: 15 },
        { week4: 16 },
        { week4: 17 },
        { week4: 18 },
        ,
    ];

    const weeks = [
        [1, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
    ];

    useEffect(() => {}, []);

    const renderDays = () => {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 7; j++) {
                return <div>{weeks[i][j]}</div>;
            }
        }
    };

    return (
        <div className="fixed bottom-2 right-2 w-100">
            {/* <div className="bg-[#1f1f1ff4]  flex justify-between border-t rounded-b-xl p-3 border-black/5"></div> */}
            <div className="border bg-[#323232]  border-gray-800/80 rounded-t-xl">
                <div className="relative ">
                    <div className="absolute  bg-[#1f1f1ff4] p-4 rounded-t-xl w-full text-white flex justify-between ">
                        <p>Wednesday, August 6</p>
                        <FaAngleDown
                            className="bg-[#323232] p-1 rounded-sm border border-gray-100/10"
                            size={25}
                        />
                    </div>
                </div>
                <div className="p-4 mt-15 flex justify-between">
                    <h1 className="text-white">August 2025</h1>
                    <div className="flex text-white gap-5">
                        <FaAngleUp />
                        <FaAngleDown />
                    </div>
                </div>
                <div className="grid grid-cols-7 justify-center items-center">
                    {daysOfWeek.map((day, index) => (
                        <div key={index}>
                            {day?.day && (
                                <h1
                                    className="text-white bg-red-500 flex justify-center items-center text-xs"
                                    key={index}
                                >
                                    {day?.day}
                                </h1>
                            )}
                            {day?.week1 && (
                                <h1
                                    className="text-white bg-green-500 flex justify-center items-center text-xs"
                                    key={index}
                                >
                                    {day?.week1}
                                </h1>
                            )}
                            {day?.week2 && (
                                <h1
                                    className="text-white bg-blue-500 flex justify-center items-center text-xs"
                                    key={index}
                                >
                                    {day?.week2}
                                </h1>
                            )}
                            {day?.week3 && (
                                <h1
                                    className="text-white bg-red-500 flex justify-center items-center text-xs"
                                    key={index}
                                >
                                    {day?.week3}
                                </h1>
                            )}
                            {day?.week4 && (
                                <h1
                                    className="text-white bg-orange-500 flex justify-center items-center text-xs"
                                    key={index}
                                >
                                    {day?.week4}
                                </h1>
                            )}
                            {/* <p>{day.num.slice(0, 1).map((da) => da)}</p> */}
                        </div>
                    ))}
                </div>
                {/* <table>
                    <tr className="grid grid-cols-7 gap-8 w-full justify-center items-center">
                        <td className="flex justify-center items-center text-xs text-white bg-red-500">Su</td>
                        <td className="flex justify-center items-center text-xs text-white bg-red-500">Mo</td>
                        <td className="flex justify-center items-center text-xs text-white bg-red-500">Tu</td>
                        <td className="flex justify-center items-center text-xs text-white bg-red-500">We</td>
                        <td className="flex justify-center items-center text-xs text-white bg-red-500">Th</td>
                        <td className="flex justify-center items-center text-xs text-white bg-red-500">Fr</td>
                        <td className="flex justify-center items-center text-xs text-white bg-red-500">Sa</td>
                    </tr>
                </table> */}
                {/* <div className="grid grid-cols-2 justify-center items-center">
                    <h1 className="text-white flex justify-center items-center text-xl">
                        {weeks.map((a, i) =>
                            a.map((_, j) => <div className="flex justify-center items-center" key={j}>{weeks[i][j]}</div>)
                        )}
                    </h1>
                </div> */}
            </div>
        </div>
    );
};

export default Calender;
