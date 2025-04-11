export const selectSteps = (state) => state.quiz.steps;
export const selectQuestions = (state) => state.quiz.questions;
export const selectAnswers = (state) => state.quiz.answers;

export const isLoading = (state) => state.quiz.loading;
export const isError = (state) => state.quiz.error;
