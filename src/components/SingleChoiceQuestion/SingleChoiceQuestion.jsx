import module from "./SingleChoiceQuestion.module.css"

const SingleChoiceQuestion = ({ question, value, onAnswer }) => {
    const { options } = question.fields;

    return (
        <div className={module.container}>
            <h3 className={module.title}>{question.fields.text}</h3>
            {options?.map((option) => (
                <label key={option}>
                    <input
                        type="radio"
                        name={question.sys.id}
                        value={option}
                        checked={value === option}
                        onChange={() => onAnswer(question.sys.id, option)}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
};

export default SingleChoiceQuestion;
