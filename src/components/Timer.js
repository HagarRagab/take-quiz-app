import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
    const { remainingTime, dispatch } = useQuiz();

    useEffect(
        function () {
            const interval = setInterval(
                () => dispatch({ type: "tick" }),
                1000
            );

            return () => clearInterval(interval);
        },
        [dispatch]
    );

    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
    const seconds = String(remainingTime % 60).padStart(2, "0");

    return (
        <div className="timer">
            {minutes}:{seconds}
        </div>
    );
}

export default Timer;
