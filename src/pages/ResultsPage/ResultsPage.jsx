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

    const correctAnswersCount = questions.reduce((acc, question) => {
        const userAnswer = userAnswers[question.sys.id];
        const correctAnswer = question.fields.correctAnswer;

        if (!userAnswer || !correctAnswer) return acc;

        if (typeof correctAnswer === "string") {
            const userInput = Array.isArray(userAnswer) ? userAnswer[0]?.trim().toLowerCase() : "";
            const correctInput = correctAnswer.trim().toLowerCase();
            if (userInput === correctInput) return acc + 1;
        }

        if (Array.isArray(correctAnswer) && correctAnswer.length === 1) {
            if (Array.isArray(userAnswer) && userAnswer[0] === correctAnswer[0]) {
                return acc + 1;
            }
        }

        if (Array.isArray(correctAnswer) && correctAnswer.length > 1) {
            const isCorrect =
                Array.isArray(userAnswer) &&
                userAnswer.length === correctAnswer.length &&
                correctAnswer.every((item) => userAnswer.includes(item));

            if (isCorrect) return acc + 1;
        }

        return acc;
    }, 0);



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
