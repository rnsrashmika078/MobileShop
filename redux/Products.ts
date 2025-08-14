"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";
interface PostState {
  ws: WebSocket | null;
  editProduct: Product | null;
  category: string;
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
  category: "",
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
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setEditProduct, setWebSocket, setCategory } =
  productSlicer.actions;
export default productSlicer.reducer;
