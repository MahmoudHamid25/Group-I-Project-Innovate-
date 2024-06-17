"use client"
import React, { useState, useEffect } from 'react';

interface Quiz {
    id: number;
    name: string;
}

const QuizList: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Function to fetch quizzes from the backend
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5003/quizzes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'  // Ensure credentials are included if needed
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setQuizzes(data);  // Set the quizzes state with the fetched data
            } catch (error) {
                console.error('Failed to fetch quizzes:', error);
            }
        };

        // Set the isClient state to true on the client-side
        setIsClient(true);

        fetchQuizzes();
    }, []);

    const handleQuizSelect = (quizId: number) => {
        if (isClient) {
            window.location.href = `/quiz/${quizId}`;
        }
    };

    return (
        <div className="quiz-list-container">
            <h2>Select a Quiz</h2>
            <ul className="quiz-list">
                {quizzes.map(quiz => (
                    <li key={quiz.id} onClick={() => handleQuizSelect(quiz.id)}>
                        {quiz.name} (ID: {quiz.id})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizList;
