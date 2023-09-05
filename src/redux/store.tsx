import { configureStore } from "@reduxjs/toolkit";
import colorSlice from "./reducer/colorSlice";

export const store = configureStore({
    reducer: {
        color: colorSlice
    },
})