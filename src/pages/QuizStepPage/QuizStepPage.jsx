import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { selectSteps, selectQuestions, isLoading, selectAnswers } from "../../redux/questions/selectors";
import { saveAnswer } from "../../redux/questions/slice.js"

import module from "./QuizStepPage.module.css";

import TextQuestion from "../../components/TextQuestion/TextQuestion.jsx";
import SingleChoiceQuestion from "../../components/SingleChoiceQuestion/SingleChoiceQuestion.jsx";

const QuizStepPage = () => {
    const { stepId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const steps = useSelector(selectSteps);
    const questions = useSelector(selectQuestions);
    const loading = useSelector(isLoading);
    const answers = useSelector(selectAnswers);

    // For steps

    const currentStep = steps?.find(
        (step) => step.fields.stepId === stepId
    );

    const stepQuestionIds = currentStep?.fields.questions?.map((q) => q.sys.id);
    const stepQuestions = questions.filter((q) =>
        stepQuestionIds?.includes(q.sys.id)
    );

    const handleAnswer = (questionId, answer) => {
        dispatch(saveAnswer({ questionId, answer }));
    };

    // For buttons

    const sortedSteps = [...steps].sort(
        (a, b) => a.fields.order - b.fields.order
    );

    const currentStepIndex = sortedSteps.findIndex(
        (step) => step.fields.stepId === stepId
    );

    const isLastStep = currentStepIndex === sortedSteps.length - 1;
    const isFirstStep = currentStepIndex === 0;

    const handleNext = () => {
        if (!isLastStep) {
            const nextStepId = sortedSteps[currentStepIndex + 1].fields.stepId;
            navigate(`/step/${nextStepId}`);
        } else {
            navigate("/results");
        }
    };

    const handleBack = () => {
        if (!isFirstStep) {
            const prevStepId = sortedSteps[currentStepIndex - 1].fields.stepId;
            navigate(`/step/${prevStepId}`);
        }
    };


    return (
        <div className={module.container}>
            {loading ? <p className={module.loading}>Loading...</p> :
                <>
                    <h1 className={module.header}>{currentStep?.fields.title}</h1>
                    <ul className={module.list}>
                        {stepQuestions?.map((question) => {
                            const { type } = question.fields;

                            if (type === "multiple-choice") {
                                return (
                                    <SingleChoiceQuestion
                                        key={question.sys.id}
                                        question={question}
                                        value={answers[question.sys.id]}
                                        onAnswer={handleAnswer}
                                    />
                                );
                            }

                            if (type === "text") {
                                return (
                                    <TextQuestion
                                        key={question.sys.id}
                                        question={question}
                                        value={answers[question.sys.id]}
                                        onAnswer={handleAnswer}
                                    />
                                );
                            }

                            return null;
                        })}
                    </ul>
                </>
            }
            <div className={module.buttonsWrapper}>
                {!isFirstStep && (
                    <button onClick={handleBack} className={module.button}>
                        Назад
                    </button>
                )}
                <button onClick={handleNext} className={module.button}>
                    {isLastStep ? "Завершити" : "Далі"}
                </button>
            </div>
        </div>
    );
};

export default QuizStepPage;

