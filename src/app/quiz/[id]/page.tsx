import React from 'react';

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

const QuizPage: React.FC<QuizProps> = async ({ params }) => {
    const { id } = params;
    const data = await fetchQuizData(id);

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
