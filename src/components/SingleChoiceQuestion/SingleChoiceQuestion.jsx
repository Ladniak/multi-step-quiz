import module from "./SingleChoiceQuestion.module.css"

const SingleChoiceQuestion = ({ question, value, onAnswer }) => {
    const { options } = question.fields;
    return (
        <div className={module.container}>
            <h3 className={module.title}>{question.fields.text}</h3>
            {options?.map((option) => (
                <label key={option} className={module.choiceLabel}>
                    <input
                        type="radio"
                        name={question.sys.id}
                        value={option}
                        checked={Array.isArray(value) && value[0] === option}
                        onChange={() => onAnswer(question.sys.id, [option])}
                        className={module.choice}
                    />
                    <span className={module.labelSpan}>{option}</span>
                </label>
            ))}
        </div>
    );
};

export default SingleChoiceQuestion;
