'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const QuizPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [quiz, setQuiz] = useState<any>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`/api/quiz/${id}`);
                const data = await response.json();
                setQuiz(data);
            } catch (error) {
                setErrorMessage('Failed to load quiz');
            }
        };

        if (id) {
            fetchQuiz();
        }
    }, [id]);

    const handleAnswerSelect = (answerId: number) => {
        setSelectedAnswer(answerId);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === null) {
            setErrorMessage('Please select an answer.');
            return;
        }

        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h2>{quiz.name}</h2>
                <div className="question-counter">
                    {currentQuestionIndex + 1} / {quiz.questions.length}
                </div>
            </div>
            <div className="question-section">
                <h3>{currentQuestion.question_text}</h3>
                <div className="answers">
                    {currentQuestion.answers.map((answer: any) => (
                        <div
                            key={answer.id}
                            className={`answer ${selectedAnswer === answer.id ? 'selected' : ''}`}
                            onClick={() => handleAnswerSelect(answer.id)}
                        >
                                                        {answer.answer_text}
                        </div>
                    ))}
                </div>
            </div>
            <div className="navigation">
                {currentQuestionIndex < quiz.questions.length - 1 && (
                    <button onClick={handleNextQuestion}>Next</button>
                )}
                {currentQuestionIndex === quiz.questions.length - 1 && (
                    <button onClick={() => alert('Quiz Completed!')}>Finish</button>
                )}
            </div>
            {errorMessage && (
                <div className="error-popup">
                    <div className="error-popup-content">
                        <p>{errorMessage}</p>
                        <button onClick={() => setErrorMessage(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;

                           
