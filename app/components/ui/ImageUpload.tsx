"use Client";
import { ImgProperty } from "@/types";
import { useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";
import RenderIcon from "./RenderIcon";
// import RenderIcon from "../svgIcons/RenderIcon";

const ImageUpload: React.FC<{
    placeholder: string;
    ImageProperty: ImgProperty[];
    index: number;
    type: string;
    setImageProperty: React.Dispatch<React.SetStateAction<ImgProperty[]>>;
}> = ({ placeholder, setImageProperty, ImageProperty, index, type }) => {
    const [isDragging, setIsDraging] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setFile(file);
        setIsDraging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraging(false);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "mystore");
            data.append("cloud_name", "dwcjokd3s");
            data.append("folder", "images");
            setLoading(true);
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dwcjokd3s/image/upload",
                {
                    method: "POST",
                    body: data,
                }
            );
            const uploadedImageURL = await res.json();
            if (uploadedImageURL) {
                setLoading(false);
                setImageProperty((ImageProperty) => [
                    ...ImageProperty,
                    {
                        secure_url: uploadedImageURL.secure_url,
                        public_id: uploadedImageURL.public_id,
                    },
                ]);
            }
        }
    };

 
    
    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={onDragLeave}
            className={`${
                isDragging ? "bg-blue-300" : "bg-[var(--input-bg-color)]"
            }  flex justify-center rounded-lg border border-dashed border-[var(--border-color)] px-6 py-1`}
        >
            <div className="relative text-center ">
                {file ? (
                    <div className="">
                        {loading ? (
                            <div className="relative flex justify-center p-2">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="z-0 flex justify-center items-center mb-2">
                                {ImageProperty[index]?.secure_url && (
                                    <Image
                                        src={ImageProperty[index]?.secure_url}
                                        alt="post image"
                                        width={200}
                                        height={150}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                ) : type === "editing" && ImageProperty[index]?.secure_url ? (
                    <Image
                        src={ImageProperty[index]?.secure_url}
                        alt="post image"
                        width={200}
                        height={150}
                    />
                ) : (
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <RenderIcon icon="image" />
                    </div>
                )}

                <div
                    className={`${
                        file ? "mt-0" : "mt-12"
                    } flex flex-col text-sm/6 text-gray-600`}
                >
                    <label className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                        Upload a image here
                        <input
                            id="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileUpload}
                        />
                    </label>
                    <span>OR</span>
                    <p className="">{placeholder}</p>
                </div>

                <p className="text-xs/5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                </p>
            </div>
        </div>
    );
};
export default ImageUpload;
