'use client';

import React, { useEffect, useState } from 'react';

const QuizPage: React.FC = () => {
    const [quiz, setQuiz] = useState<any>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch('/api/quiz');
                const data = await response.json();
                if (response.ok) {
                    setQuiz(data);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Failed to fetch quiz:', error);
            }
        };

        fetchQuiz();
    }, []);

    const handleAnswerSelection = (index: number) => {
        setSelectedAnswer(index);
    };

    const handleNextQuestion = () => {
        if (quiz.questions[currentQuestionIndex].answers[selectedAnswer!].is_correct) {
            setScore(score + 1);
        }
        setSelectedAnswer(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    if (currentQuestionIndex >= quiz.questions.length) {
        return (
            <div>
                <h2>Quiz Completed</h2>
                <p>Your Score: {score} / {quiz.questions.length}</p>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div>
            <h2>{quiz.name}</h2>
            <div>
                <h3>Question {currentQuestionIndex + 1} / {quiz.questions.length}</h3>
                <p>{currentQuestion.question_text}</p>
                <div>
                    {currentQuestion.answers.map((answer: any, index: number) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelection(index)}
                        >
                            {answer.answer_text}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
                Next Question
            </button>
        </div>
    );
};

export default QuizPage;
