"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";
interface PostState {
    ws: WebSocket | null;
    editProduct: Product | null;
}

const initialState: PostState = {
    ws: null,
    editProduct: {
        _id: "",
        name: "",
        price: 0,
        model: "",
        category: "",
        images: [],
        stock: 0,
        createdAt: "",
    },
};

const productSlicer = createSlice({
    name: "productSlicer",
    initialState,
    reducers: {
        setEditProduct: (state, action: PayloadAction<Product | null>) => {
            state.editProduct = action.payload;
        },
        setWebSocket: (state, action: PayloadAction<WebSocket>) => {
            state.ws = action.payload;
        },
    },
});

export const { setEditProduct, setWebSocket } = productSlicer.actions;
export default productSlicer.reducer;
