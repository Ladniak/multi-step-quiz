import module from "./TextQuestion.module.css"

const TextQuestion = ({ question, value, onAnswer }) => {
    const handleChange = (e) => {
        onAnswer(question.sys.id, e.target.value);
    };

    return (
        <div className={module.container}>
            <h3 className={module.title}>{question.fields.text}</h3>
            <input
                type="text"
                value={value || ""}
                onChange={handleChange}
            />
        </div>
    );
};

export default TextQuestion;
