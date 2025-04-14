import { createSlice } from "@reduxjs/toolkit";
import { fetchQuestions, fetchSteps } from "./operations";

const INITIAL_STATE = {
  steps: [],
  questions: [],
  answers: {},
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: INITIAL_STATE,
  reducers: {
    saveAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    resetQuiz: () => INITIAL_STATE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSteps.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSteps.fulfilled, (state, action) => {
        state.loading = false;
        state.steps = action.payload;
      })
      .addCase(fetchSteps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { saveAnswer, resetQuiz } = quizSlice.actions;
export const quizReducer = quizSlice.reducer;
