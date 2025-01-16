import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
    const { numQuestions, currentQueIndex, answer, dispatch } = useQuiz();

    if (answer === null) return null;
    const status = currentQueIndex === numQuestions - 1 ? "finish" : "next";

    return (
        <button
            className="btn btn-ui"
            onClick={() =>
                dispatch({
                    type: status,
                })
            }
        >
            {status}
        </button>
    );
}

export default NextButton;
