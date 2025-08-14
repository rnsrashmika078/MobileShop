import React from "react";

interface SelectProps {
    value: string;
    onValueChange: (value: string) => void;
    children?: React.ReactNode;
    className?: string;
}

export const Select = ({
    value,
    onValueChange,
    children,
    className,
}: SelectProps) => {
    return (
        <select
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        >
            {children}
        </select>
    );
};

interface SelectItemProps {
    value: string;
    children: React.ReactNode;
}

export const SelectItem = ({ value, children }: SelectItemProps) => {
    return <option value={value}>{children}</option>;
};
