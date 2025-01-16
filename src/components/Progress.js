import { useQuiz } from "../contexts/QuizContext";

function Progress() {
    const { numQuestions, currentQueIndex, totalPoints, answer, scorePoints } =
        useQuiz();

    return (
        <div className="progress">
            <progress
                max={numQuestions}
                value={currentQueIndex + Number(answer !== null)}
            ></progress>
            <p>
                Question <span>{currentQueIndex + 1}</span>/{numQuestions}
            </p>
            <p>
                <span>{totalPoints}</span>/{scorePoints} points
            </p>
        </div>
    );
}

export default Progress;
