import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

const API_URL = `https://mabdurahman.github.io/questions-api/data/reactjs-questions.json`;
const SECS_QUIZ_TIME = 30;
const INIT_STATE = {
    questions: [],
    // loading, error, ready, active, finished
    status: "loading",
    currentQueIndex: 0,
    answer: null,
    totalPoints: 0,
    highScore: 0,
    remainingTime: null,
};

const reducer = function (state, action) {
    switch (action.type) {
        case "dataFailed":
            return { ...state, status: "error" };
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };
        case "startQuiz":
            return {
                ...state,
                status: "active",
                remainingTime: state.questions.length * SECS_QUIZ_TIME,
            };
        case "selectAnswer":
            return {
                ...state,
                answer: action.payload.answer,
                totalPoints:
                    state.questions[state.currentQueIndex].correctOption ===
                    action.payload.answer
                        ? state.totalPoints + action.payload.points
                        : state.totalPoints,
            };
        case "next":
            return {
                ...state,
                currentQueIndex: state.currentQueIndex + 1,
                answer: null,
            };
        case "tick":
            return {
                ...state,
                remainingTime: state.remainingTime - 1,
                status: state.remainingTime === 0 ? "finished" : state.status,
            };
        case "finish":
            return {
                ...state,
                status: "finished",
                highScore:
                    state.highScore < state.totalPoints
                        ? state.totalPoints
                        : state.highScore,
            };
        case "reset":
            return {
                ...INIT_STATE,
                questions: state.questions,
                status: "active",
                highScore: state.highScore,
                remainingTime: state.questions.length * SECS_QUIZ_TIME,
            };
        default:
            throw new Error("Action unknown");
    }
};

function QuizProvider({ children }) {
    const [
        {
            questions,
            status,
            currentQueIndex,
            totalPoints,
            answer,
            highScore,
            remainingTime,
        },
        dispatch,
    ] = useReducer(reducer, INIT_STATE);

    const numQuestions = questions.length;
    const currentQuestion = questions[currentQueIndex];
    const scorePoints = questions.reduce((acc, cur) => (acc += cur.points), 0);

    useEffect(function () {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch(() => dispatch({ type: "dataFailed" }));
    }, []);

    return (
        <QuizContext.Provider
            value={{
                questions,
                numQuestions,
                status,
                currentQuestion,
                currentQueIndex,
                totalPoints,
                answer,
                scorePoints,
                highScore,
                remainingTime,
                dispatch,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const value = useContext(QuizContext);
    if (value === undefined)
        throw new Error("QuizContext was used outside QuizProvider.");
    return value;
}

export { QuizProvider, useQuiz };
