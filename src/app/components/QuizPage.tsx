// src/app/components/QuizPage.tsx

import { useEffect, useState } from 'react';

interface QuizPageProps {
    id: string;
}

const QuizPage: React.FC<QuizPageProps> = ({ id }) => {
    const [quiz, setQuiz] = useState<any>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    useEffect(() => {
        fetch(`/api/quiz/${id}`)
            .then(res => res.json())
            .then(data => setQuiz(data))
            .catch(error => console.error('Error loading quiz:', error));
    }, [id]);

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleAnswerSelect = (index: number) => {
        setSelectedAnswer(index);
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h1>{quiz.name}</h1>
                <div className="question-counter">
                    {currentQuestionIndex + 1} / {quiz.questions.length}
                </div>
            </div>
            <div className="question-section">
                <h3>{currentQuestion.question_text}</h3>
                <div className="answers">
                    {currentQuestion.answers.map((answer: any, index: number) => (
                        <div
                            key={index}
                            className={`answer ${selectedAnswer === index ? 'selected' : ''}`}
                            onClick={() => handleAnswerSelect(index)}
                        >
                            {answer.answer_text}
                        </div>
                    ))}
                </div>
            </div>
            <div className="navigation">
                <button onClick={handleNextQuestion} disabled={currentQuestionIndex >= quiz.questions.length - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default QuizPage;
