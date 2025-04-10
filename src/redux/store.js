import { configureStore } from "@reduxjs/toolkit";
import { quizReducer } from "./questions/slice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});
