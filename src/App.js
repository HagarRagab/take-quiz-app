import { QuizProvider } from "./contexts/QuizContext";

import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
    return (
        <div className="app">
            <Header />
            <QuizProvider>
                <Main />
            </QuizProvider>
        </div>
    );
}
