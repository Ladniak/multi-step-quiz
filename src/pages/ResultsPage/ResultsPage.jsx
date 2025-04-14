import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectAnswers, selectQuestions } from "../../redux/questions/selectors";
import { resetQuiz } from "../../redux/questions/slice";

import module from "./ResultsPage.module.css";

const ResultsPage = () => {
    const userAnswers = useSelector(selectAnswers);
    const questions = useSelector(selectQuestions);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const correctAnswersCount = Object.entries(userAnswers).filter(([questionId, answerArr]) => {
        const question = questions.find((q) => q.sys.id === questionId);
        const correct = question?.fields.correctAnswer;

        if (!question) return false;

        if (Array.isArray(correct)) {
            return Array.isArray(answerArr) &&
                correct.length === answerArr.length &&
                correct.every((ans) => answerArr.includes(ans));
        } else {
            return Array.isArray(answerArr) && answerArr[0] === correct;
        }
    }).length;


    const handleRestart = () => {
        dispatch(resetQuiz());
        navigate("/");
    };

    return (
        <div className={module.wrapper}>
            <h1 className={module.title}>🎉 Вітаємо! Ви завершили вікторину</h1>
            <p className={module.score}>
                Правильних відповідей: <strong>{correctAnswersCount}</strong> з{" "}
                <strong>{questions.length}</strong>
            </p>
            <button className={module.restartBtn} onClick={handleRestart}>
                Почати спочатку
            </button>
        </div>
    );
};

export default ResultsPage;
