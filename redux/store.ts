"use client";
import { configureStore } from "@reduxjs/toolkit";
import productSlicer from "./Products";
import setNotify from "./NotifySlicer";
import feedSlicer from "./FeedSlicer";

export const store = configureStore({
    reducer: {
        product: productSlicer,
        notify: setNotify,
        feed: feedSlicer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
