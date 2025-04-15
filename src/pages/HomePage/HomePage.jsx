import module from "./HomePage.module.css";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchQuestions, fetchSteps } from "../../redux/questions/operations";
import { selectSteps } from "../../redux/questions/selectors";

const HomePage = () => {
    const dispatch = useDispatch();
    const steps = useSelector(selectSteps);

    useEffect(() => {
        dispatch(fetchSteps());
        dispatch(fetchQuestions());
    }, [dispatch]);

    const sortedSteps = [...steps].sort(
        (a, b) => a.fields.order - b.fields.order
    );

    return (
        <div className={module.homeDiv}>
            <p className={module.par}>
                Сайт на якому ви можете себе перевірити на знання України. Тут зібрані цікаві питання, які змусять вас замислитися.
                Якщо готові тисніть на посилання!
            </p>
            {sortedSteps.length > 0 && (
                <Link to={`/step/${sortedSteps[0].fields.stepId}`} className={module.title}>Почати тестування</Link>
            )}
        </div>
    );
};

export default HomePage;
