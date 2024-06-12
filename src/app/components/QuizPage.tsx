import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const QuizPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [quiz, setQuiz] = useState<any>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    useEffect(() => {
        if (!router.isReady) return;

        if (id) {
            fetch(`/api/quiz/${id}`)
                .then(res => res.json())
                .then(data => setQuiz(data))
                .catch(error => console.error('Error loading quiz:', error));
        }
    }, [router.isReady, id]);

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
