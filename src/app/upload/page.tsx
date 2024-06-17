'use client'
import React, { useState, useRef } from 'react';

const QuizGenerator: React.FC = () => {
    const [document, setDocument] = useState<File | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [quizName, setQuizName] = useState<string>('');
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [quizId, setQuizId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setDocument(file);
            setFileName(file.name);
        } else {
            setFileName('');
        }
    };

    const togglePopup = () => setOverlayVisible(!overlayVisible);

    const resetForm = () => {
        setDocument(null);
        setPrompt('');
        setQuizName('');
        setFileName('');
        setErrorMessage(null);
        setSuccessMessage(null);
        setQuizId(null);
    };

    const saveQuiz = async () => {
        if (!document || !quizName.trim()) {
            setErrorMessage('Please fill all fields and select a document.');
            return;
        }
        togglePopup();
        const formData = new FormData();
        formData.append('document', document);
        formData.append('quiz_name', quizName);
        formData.append('prompt', prompt);

        try {
            const response = await fetch('http://127.0.0.1:5003/generate_quiz', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(data.message);
                setQuizId(data.quiz_id); // Set the quiz ID
            } else {
                throw new Error(data.message || 'Failed to save the quiz.');
            }
        } catch (error) {
            console.error('Failed to save the quiz:', error);
            setErrorMessage('Failed to save the quiz. Please try again.');
        }
    };

    const redirectToQuiz = () => {
        if (quizId) {
            window.location.href = `http://localhost:3000/quiz/${quizId}`;
        } else {
            window.location.href = 'http://localhost:3000/QuizList';
        }
    };

    return (
        <div className="uploadContainer">
            <div className="uploadContent">
                <div className="instructions">
                    <p>Here you write what our AI will generate for you questions based on the subject that you wrote.</p>
                    <b>It requires:</b>
                    <p>A minimum of 500 words to be able to generate questions.</p>
                    <p>The subject must be clear.</p>
                    <p>Grammar mistakes kept as minimum as possible.</p>
                    <button className="file-input" onClick={() => fileInputRef.current?.click()}>Upload file</button>
                    <input type="file" className="file-input-real" id="document" name="document"
                           accept=".txt, .pdf, .docx, .md"
                           onChange={handleFileChange} ref={fileInputRef} required />
                    <span id="file-name" className="file-name">{fileName}</span>
                </div>
                <div className="input-area">
                    <small>Write here your additional information:</small>
                    <textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} required
                              placeholder="Enter additional information..." />
                    <div className="uploadButtons">
                        <button className="reset" type="button" onClick={resetForm}>Reset</button>
                        <button className="upload" onClick={togglePopup}>Upload</button>
                    </div>
                </div>
            </div>
            {overlayVisible && (
                <div className="overlay" onClick={togglePopup}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <h3>Enter a name for your quiz</h3>
                        <input type="text" name="quizName" value={quizName} onChange={(e) => setQuizName(e.target.value)} placeholder="Quiz Name" />
                        <button onClick={togglePopup}>Cancel</button>
                        <button onClick={saveQuiz}>Save Quiz</button>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="error-popup">
                    <div className="error-popup-content">
                        <p>{errorMessage}</p>
                        <button onClick={() => setErrorMessage(null)}>Close</button>
                    </div>
                </div>
            )}
            {successMessage && (
                <div className="success-popup">
                    <div className="success-popup-content">
                        <p>{successMessage}</p>
                        <button onClick={redirectToQuiz}>Solve the quiz</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizGenerator;
