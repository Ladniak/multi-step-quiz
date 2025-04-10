import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchQuestions, fetchSteps } from "./redux/questions/operations";

function App() {
  const dispatch = useDispatch();
  const { steps, questions } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchSteps());
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {steps?.map((step) => (
          <li key={step.sys.id}>
            <p>{step.fields.title}</p>
          </li>
        ))}
      </ul>
      <ul>
        {questions?.map((quest) => (
          <li key={quest.sys.id}>
            <p>{quest.fields.text}</p>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default App
