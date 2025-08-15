"use client";
import { Product, ImgProperty } from "@/types";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import Button from "./Button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Spinner from "./Spinner";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // children: React.ReactNode;
  className?: string;
  product: Product;
  handleEdit?: (product: Product) => void;
  handleDelete?: (_id: string, productImage: ImgProperty[]) => void;
  children?: ReactNode;
  loadingState: boolean;
}

export const Card = ({
  children,
  product,
  loadingState,
  handleDelete,
  handleEdit,
  ...rest
}: CardProps) => {
  const [index, setIndex] = useState<number>(0);
  const auth = useSelector((store: RootState) => store.notify.token);

  const [trackDeleteId, setTrackDeleteId] = useState<string | null>(null);

  return (
    <div
      onMouseEnter={() => setIndex(1)}
      onMouseLeave={() => setIndex(0)}
      {...rest}
      className="relative border border-gray-200 bg-white shadow-md overflow-hidden w-50 h-auto py-2 text-center"
    >
      {product.images[index] ? (
        product.images[index].secure_url && (
          <Image
            className="m-auto w-[200px] h-[200px]  mb-2"
            src={product.images[index].secure_url}
            alt={product.name}
            width={180}
            height={38}
            priority
          />
        )
      ) : (
        <Image
          className="m-auto w-[200px] h-[200px]  mb-2 rounded-lg"
          src={"/noimage.jpg"}
          alt={product.name}
          width={180}
          height={38}
          priority
        />
      )}
      <div className="flex flex-col px-2 justify-start items-start">
        <div className="text-lg font-medium text-start h-14 w-fit">
          {product.name}
        </div>
        <div className="text-sm text-gray-500">{product.category}</div>
        <div className="text-sm text-gray-500">{product.color}</div>
        <div className="font-semibold text-blue-600">
          Rs {product.price.toFixed(2)}
        </div>
      </div>
      {auth && (
        <div className="flex gap-2 mx-2 my-1">
          <Button size="sm" onClick={() => handleEdit && handleEdit(product)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              if (handleDelete) {
                handleDelete(product._id, product.images);
              }
              setTrackDeleteId(product._id);
            }}
          >
            Delete
          </Button>
        </div>
      )}
      {children}
      {loadingState && product._id === trackDeleteId && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
          <Spinner />
        </div>
      )}
    </div>
  );
};
