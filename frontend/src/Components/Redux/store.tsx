import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/Auth/AuthSlice";
import bills from "./Slices/Bills/bills";

export const store = configureStore({
    reducer: {
        auth : AuthSlice,
        bills : bills
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;