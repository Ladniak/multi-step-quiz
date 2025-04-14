import module from "./TextQuestion.module.css"

const TextQuestion = ({ question, value, onAnswer }) => {
    const handleChange = (e) => {
        const input = e.target.value.toLowerCase();
        onAnswer(question.sys.id, [input]);
    };

    return (
        <div className={module.container}>
            <h3 className={module.title}>{question.fields.text}</h3>
            <input
                type="text"
                value={Array.isArray(value) ? value[0] || "" : ""}
                onChange={handleChange}
                className={module.field}
                placeholder="Введіть відповідь"
            />
        </div>
    );
};

export default TextQuestion;
