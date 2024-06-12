"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Quiz {
    id: number;
    name: string;
}

const QuizList: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch('http://127.0.0.1:5003/quizzes')
            .then(response => response.json())
            .then(data => setQuizzes(data))
            .catch(error => console.error('Failed to fetch quizzes:', error));
    }, []);

    const handleQuizSelect = (quizId: number) => {
        router.push(`/quiz/${quizId}`);
    };

    return (
        <div className="quiz-list-container">
            <h2>Select a Quiz</h2>
            <ul className="quiz-list">
                {quizzes.map(quiz => (
                    <li key={quiz.id} onClick={() => handleQuizSelect(quiz.id)}>
                        {quiz.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizList;
