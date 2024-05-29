'use client'

import {useState} from "react";

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
    if (promptState) {
        return (
            <div>
                <div>
                    <button onClick={documentClick}>Document</button>
                    <button onClick={textClick}>Text</button>
                    <div>
                        <p>Here you write what our AI will generate for you, the questions are based on the subject that
                            you wrote.
                            It requires:
                            <ul>
                                <li>A minimum of 500 words to be able to generate questions.</li>
                                <li>The subject must be clear.</li>
                                <li>Grammar mistakes kept to the minimum.</li>
                            </ul>
                            <button>{/* Reset button */}</button>
                        </p>
                    </div>
                </div>
                <div>
                    <form method={"post"} action={""}>
                        <label htmlFor={"textData"}>Write your subject here</label>
                        <input type={"text"} name={"textData"}></input>
                        <input type={"submit"}
                               name={"submit"}></input> {/* this will probably have to be placed with position (or we just change the design) */}
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div>
                    <div className={"docButton"}>
                    <button onClick={documentClick}>Document</button>
                    </div>
                    <div className={"textButton"}>
                    <button onClick={textClick}>Text</button>
                    </div>
                    <form encType={"multipart/form-data"} action={""} method={"Post"}>
                        <input type={"file"} name={"documentData"}/>
                        <label htmlFor={"documentData"}>Acceptable doc types: .pdf, .doc, .txt</label>
                        <div className="coloredLine"></div>
                        <p>Select which chapters you would like to be generated into questions:</p>
                        <input type={""}/>
                        <input type={""}/> {/*find a way to create a list of the chapters*/}
                        <p>Ex: chapter title/page number</p>
                        <div className="coloredLine"></div>
                        <p>Select other chapters (optional): </p>
                        <button></button>
                        <button></button>
                        <button>{/* Reset button */}</button>
                        <input type={"submit"}/>
                    </form>
                </div>
                <div>
                    {/*preview*/}
                </div>
            </div>
        );
    }
}
