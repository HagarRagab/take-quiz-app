import { useQuiz } from "../contexts/QuizContext";

function Options() {
    const { currentQuestion, answer, dispatch } = useQuiz();
    const { options, correctOption, points } = currentQuestion;

    return (
        <div className="options">
            {options.map((option, i) => (
                <button
                    className={`btn btn-option ${
                        answer === i ? "answer" : ""
                    } ${
                        answer === null
                            ? ""
                            : i === correctOption
                            ? "correct"
                            : "wrong"
                    }`}
                    onClick={() =>
                        dispatch({
                            type: "selectAnswer",
                            payload: { answer: i, points },
                        })
                    }
                    disabled={answer !== null}
                    key={option}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Options;
