"use client";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import RenderIcon from "./RenderIcon";

const FloatingObject = () => {
    const router = useRouter();
    return (
        <div className="fixed bottom-5 right-0 -translate-x-5 -translate-y-0">
            <Button
                aria-label="Add Product"
                size="xs"
                onClick={() => router.push("/addproduct")}
            >
                <RenderIcon icon="add" />
            </Button>
        </div>
    );
};

export default FloatingObject;
