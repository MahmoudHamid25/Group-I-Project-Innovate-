"use client";

import React, { useState } from 'react';

const GenerateQuizPage: React.FC = () => {
    const [document, setDocument] = useState<File | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setDocument(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!document || !prompt) {
            setError('Please provide both a document and a prompt.');
            return;
        }

        const formData = new FormData();
        formData.append('document', document);
        formData.append('prompt', prompt);

        try {
            const res = await fetch('/api/generatequiz', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            setResponse(data);
        } catch (error) {
            setError('Failed to generate quiz');
        }
    };

    return (
        <div>
            <h1>Generate Quiz</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="document">Document:</label>
                    <input type="file" id="document" onChange={handleFileChange} required accept=".txt,.pdf,.doc,.docx,.md"/>
                </div>
                <div>
                    <label htmlFor="prompt">Prompt:</label>
                    <input type="text" id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} required />
                </div>
                <button type="submit">Generate Quiz</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h2>Quiz Generated Successfully</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default GenerateQuizPage;
