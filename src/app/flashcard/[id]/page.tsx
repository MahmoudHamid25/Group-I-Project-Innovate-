"use client"
import React, { useEffect, useState } from 'react';

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

interface Quiz {
    id: number;
    name: string;
    questions: Question[];
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

const FlashcardsPage: React.FC<QuizProps> = ({ params }) => {
    const { id } = params;
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: Quiz = await fetchQuizData(id);
                setQuiz(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!quiz) {
        return <div>No quiz found</div>;
    }

    return (
        <div className="flashcards-container">
            <h1>{quiz.name}</h1>
            <div className="flashcards">
                {quiz.questions.map((question, index) => (
                    <div className="flashcard" key={index}>
                        <div className="flashcard-inner">
                            <div className="flashcard-front">
                                <p>{question.question_text}</p>
                            </div>
                            <div className="flashcard-back">
                                {question.answers.filter(answer => answer.is_correct).map((answer, idx) => (
                                    <p key={idx}>{answer.answer_text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <a href={`/quiz/${id}`} className="back-to-quiz-button">Go back to the quiz</a>
        </div>
    );
};

export default FlashcardsPage;
