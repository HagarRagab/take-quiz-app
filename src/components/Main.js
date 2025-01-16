import { useQuiz } from "../contexts/QuizContext";

import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Question from "./Question";
import ResultScreen from "./ResultScreen";
import NextButton from "./NextButton";
import Timer from "./Timer";

function Main() {
    const { status } = useQuiz();

    return (
        <main className="main">
            {status === "error" && <Error />}
            {status === "loading" && <Loader />}
            {status === "ready" && <StartScreen />}
            {status === "active" && (
                <div>
                    <Progress />
                    <Question />
                    <footer>
                        <Timer />
                        <NextButton />
                    </footer>
                </div>
            )}
            {status === "finished" && <ResultScreen />}
        </main>
    );
}

export default Main;
