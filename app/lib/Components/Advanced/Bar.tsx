import React from "react";
import { BiTerminal, BiWindows } from "react-icons/bi";
import { BsNewspaper } from "react-icons/bs";
import { CgKeyboard } from "react-icons/cg";
import { FaChrome } from "react-icons/fa";
import {
    MdOutlineKeyboardArrowUp,
    MdSignalWifiStatusbarNotConnected,
} from "react-icons/md";
import { VscVscode } from "react-icons/vsc";

const Bar = () => {
    return (
        //  h-[calc(100vh-9rem)]
        <div className="flex flex-col h-screen scrollbar-hidden justify-between">
            <div>bar</div>
            <div>bar</div>
            <div className="p-5 border flex justify-between">
                <span>
                    <BsNewspaper size={30} />
                </span>
                <span className="flex gap-5">
                    <BiWindows color="" size={30} />
                    <FaChrome color="" size={30} />
                    <BiTerminal color="" size={30} />
                    <VscVscode color="" size={30} />
                </span>
                <span>
                    <MdOutlineKeyboardArrowUp size={30} />
                    <CgKeyboard size={30} />
                    <MdSignalWifiStatusbarNotConnected />
                </span>
            </div>
            {/* bg-[rgba(5,5,5,1)] */}
        </div>
    );
};

export default Bar;
