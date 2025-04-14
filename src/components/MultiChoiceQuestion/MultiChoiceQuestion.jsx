import module from "./MultiChoiceQuestion.module.css";

const MultiChoiceQuestion = ({ question, value = [], onAnswer }) => {
    const { options } = question.fields;

    console.log(options);

    const handleChange = (option) => {
        const isSelected = value.includes(option);
        const newValue = isSelected
            ? value.filter((item) => item !== option)
            : [...value, option];

        onAnswer(question.sys.id, newValue);
    };

    return (
        <div className={module.container}>
            <h3 className={module.title}>{question.fields.text}</h3>
            {options?.map((option) => (
                <label key={option} className={module.choiceLabel}>
                    <input
                        type="checkbox"
                        name={question.sys.id}
                        value={option}
                        checked={value.includes(option)}
                        onChange={() => handleChange(option)}
                        className={module.choice}
                    />
                    <span className={module.labelSpan}>{option}</span>
                </label>
            ))}
        </div>
    );
};

export default MultiChoiceQuestion;
