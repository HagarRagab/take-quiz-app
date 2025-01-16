import { useQuiz } from "../contexts/QuizContext";

function ResultScreen() {
    const { totalPoints, scorePoints, highScore, dispatch } = useQuiz();

    const percentage = Math.round((totalPoints / scorePoints) * 100);

    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🥈";
    if (percentage >= 50 && percentage < 80) emoji = "🥉";
    if (percentage >= 20 && percentage < 50) emoji = "😢";
    if (percentage === 0) emoji = "🤦‍♂️";

    return (
        <div>
            <p className="result">
                <span>{emoji}</span>You scored <strong>{totalPoints}</strong>{" "}
                out of {scorePoints} ({percentage}%)
            </p>
            <p className="highscore">The highest score is {highScore}</p>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "reset" })}
            >
                Reset the quiz
            </button>
        </div>
    );
}

export default ResultScreen;
