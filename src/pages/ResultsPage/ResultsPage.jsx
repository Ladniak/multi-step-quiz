import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

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

    const data = [
        { name: "Правильні", value: correctAnswersCount },
        { name: "Неправильні", value: questions.length - correctAnswersCount },
    ];

    const COLORS = ["#4e75ff", "#ff6b6b"];

    return (
        <div className={module.wrapper}>
            <h1 className={module.title}>Ви завершили вікторину</h1>
            <p className={module.score}>
                Правильних відповідей: <strong>{correctAnswersCount}</strong> з{" "}
                <strong>{questions.length}</strong>
            </p>

            <div className={module.chartWrapper}>
                <PieChart width={300} height={250}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>

            <button className={module.restartBtn} onClick={handleRestart}>
                На домашню сторінку
            </button>
        </div>
    );
};

export default ResultsPage;
