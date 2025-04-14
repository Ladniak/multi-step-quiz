import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import QuizStepPage from "./pages/QuizStepPage/QuizStepPage";
import QuizLayout from "./components/QuizLayout/QuizLayout";
import ResultsPage from "./pages/ResultsPage/ResultsPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/step" element={<QuizLayout />}>
        <Route path=":stepId" element={<QuizStepPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
}

export default App;
