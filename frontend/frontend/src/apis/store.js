import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../todo/todoSlice.js"
export const store = configureStore({
    reducer: todoReducer
})