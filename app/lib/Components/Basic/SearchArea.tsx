import React from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchAreaProps extends React.InputHTMLAttributes<HTMLInputElement> {
    radius?: "none" | "xs" | "md" | "xl" | "full";
    placeholder?: string;
}

const SearchArea = React.forwardRef<HTMLInputElement, SearchAreaProps>(
    (props, ref) => {
        const { placeholder, radius } = props;
        const radiuses = {
            none: "rounded-none",
            xs: "rounded-xs",
            md: "rounded-md",
            xl: "rounded-xl",
            full: "rounded-full",
        };

        return (
            <div className="relative w-full">
                <input
                    ref={ref}
                    placeholder={placeholder}
                    {...props}
                    className={`border shadow-sm rounded-2xl p-2 pl-5 w-full bg-gray-100 border-gray-200 ${
                        radiuses[radius || "none"]
                    } text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-gray-200 hover:border-gray-300`}
                />
                <div className="absolute right-3 top-1/2  -translate-y-1/2 text-gray-500">
                    <IoIosSearch size={25}/>
                </div>
            </div>
        );
    }
);

SearchArea.displayName = "SearchArea";

export default SearchArea;
