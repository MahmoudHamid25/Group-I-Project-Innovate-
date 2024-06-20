"use client"
import React, { useState, useEffect } from 'react';

interface Answer {
    id: number;
    answer_text: string;
    is_correct: boolean;
}

interface Question {
    id: number;
    question_text: string;
    answers: Answer[];
}

interface QuizProps {
    params: {
        id: string;
    };
}

const fetchQuizData = async (id: string) => {
    const response = await fetch(`http://127.0.0.1:5003/quiz/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

const QuizPage: React.FC<QuizProps> = ({ params }) => {
    const { id } = params;
    const [data, setData] = useState<{quizName: string, questions: Question[]}>({quizName: '', questions: []});
    const [answers, setAnswers] = useState<{[key: number]: number}>({});
    const [score, setScore] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const quizData = await fetchQuizData(id);
                setData(quizData);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleAnswerChange = (questionId: number, answerId: number) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answerId,
        }));
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        data.questions.forEach((question) => {
            const selectedAnswerId = answers[question.id];
            const selectedAnswer = question.answers.find(answer => answer.id === selectedAnswerId);
            if (selectedAnswer && selectedAnswer.is_correct) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
    };

    return (
        <div className="quiz-page-container">
            <h2>{data.quizName}</h2>
            <ul className="question-list">
                {data.questions.map((question: Question) => (
                    <li key={question.id}>
                        <p>{question.question_text}</p>
                        <ul>
                            {question.answers.map((answer) => (
                                <li key={answer.id}>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={answer.id}
                                            checked={answers[question.id] === answer.id}
                                            onChange={() => handleAnswerChange(question.id, answer.id)}
                                        />
                                        {answer.answer_text}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <button onClick={handleSubmit}>Submit</button>
            {score !== null && <p>Your score: {score} / {data.questions.length}</p>}
        </div>
    );
};

export default QuizPage;
