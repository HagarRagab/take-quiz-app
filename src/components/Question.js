import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
    const { currentQuestion } = useQuiz();

    return (
        <>
            <h2>{currentQuestion.question}</h2>
            <Options />
        </>
    );
}

export default Question;
