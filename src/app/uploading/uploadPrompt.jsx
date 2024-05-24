'use client'

import { useState } from "react";

export default function UploadPrompt() {
    // Initialize state with useState
    const [promptState, setPromptState] = useState(false);

    // Define the functions to update the state
    function documentClick() {
        setPromptState(false);
    }

    function textClick() {
        setPromptState(true);
    }

    // Return the JSX based on the current state
    if (!promptState) {
        return (
            <div>
                <p>this is false</p>
                <button onClick={documentClick}>Document</button>
                <button onClick={textClick}>Text</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>this is true</p>
                <button onClick={documentClick}>Document</button>
                <button onClick={textClick}>Text</button>
            </div>
        );
    }
}
