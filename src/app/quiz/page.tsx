'use client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Question {
    id: number;
    question_text: string;
    answers: { id: number; answer_text: string; is_correct: boolean }[];
}

const QuizPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [questions, setQuestions] = useState<Question[]>([]);
    const [quizName, setQuizName] = useState('');

    useEffect(() => {
        if (id) {
            // Fetch the quiz questions from the backend
            const fetchQuestions = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:5003/quiz/${id}`, {
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
                    setQuizName(data.quizName);
                    setQuestions(data.questions);  // Set the questions state with the fetched data
                } catch (error) {
                    console.error('Failed to fetch quiz questions:', error);
                }
            };

            fetchQuestions();
        }
    }, [id]);

    return (
        <div className="quiz-page-container">
            <h2>{quizName}</h2>
            <ul className="question-list">
                {questions.map(question => (
                    <li key={question.id}>
                        <p>{question.question_text}</p>
                        <ul>
                            {question.answers.map(answer => (
                                <li key={answer.id}>
                                    {answer.answer_text} {answer.is_correct ? '(Correct)' : ''}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizPage;