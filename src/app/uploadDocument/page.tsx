'use client'

import React, {useState} from "react";


interface Errors {
    prompt?: string;
    file?: string;
}

export default function UploadDocument() {
    const [prompt, setPrompt] = useState<string>('');
    const [file, setFile] = useState<any>('');
    const [errors, setErrors] = useState<Errors>({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/generatequiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log("Upload API Response Data:", data); // Debugging statement

            if (!response.ok) {
                throw new Error(data.error || `Server responded with status ${response.status}`);
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
                setSuccessMessage('');
            } else {
                setErrorMessage('An unknown error occurred');
                setSuccessMessage('');
            }
        }
    };

    return (
        <div>
            <h1>Upload Document to Generate Quiz</h1>
            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                <label htmlFor="document">Choose a document:</label>
                <input type="file" id="document" name="document" required accept=".txt,.pdf,.docx,.md"/>
                <br/>
                <label htmlFor="prompt">Enter the prompt:</label>
                <textarea id="prompt" name="prompt" required></textarea>
                <br/>
                <button type="submit">Generate Quiz</button>
            </form>
            {errors.file && <p style={{ color: 'red' }}>{errors.file}</p>}
            {errors.prompt && <p style={{ color: 'red' }}>{errors.prompt}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
}
