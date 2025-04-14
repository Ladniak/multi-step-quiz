import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSteps } from "../../redux/questions/selectors";

import module from "./QuizLayout.module.css";

const QuizLayout = () => {
    const { stepId } = useParams();
    const steps = useSelector(selectSteps);

    const sortedSteps = [...steps].sort((a, b) => a.fields.order - b.fields.order);
    const totalSteps = sortedSteps.length;
    const currentStepIndex = sortedSteps.findIndex(
        (step) => step.fields.stepId === stepId
    );

    const progress = ((currentStepIndex + 1) / totalSteps) * 100;

    return (
        <div className={module.wrapper}>
            <header className={module.progressContainer}>
                <div className={module.progressBar}>
                    <div className={module.progressFill} style={{ width: `${progress}%` }}></div>
                </div>
                <p className={module.progressText}>
                    Крок {currentStepIndex + 1} з {totalSteps}
                </p>
            </header>

            <main className={module.content}>
                <Outlet />
            </main>
        </div>
    );
};

export default QuizLayout;
