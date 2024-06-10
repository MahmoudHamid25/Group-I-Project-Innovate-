function Results() {
    return (
        <div className={"resultsPage"}>
            <h1><strong>Test Finished</strong></h1>
            <div className="resultsMain">
                <div className="resultsTable">
                    <h2>Results:</h2>
                    <table className="resultsTableRow">
                        <tr>
                            <th>Total</th>
                            <th>Correct</th>
                            <th>Wrong</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div className="feedbackTable">
                    <h2>Feedback:</h2>
                    <div className="feedback">
                    </div>
                </div>
            </div>
            <section className="questions">
                <h2>Questions used during this test:</h2>
                <div className={"container"}>
                    <textarea readOnly></textarea>
                    <div className="buttons">
                        <button className={"button1"}>Download</button>
                        <button className={"button2"}>Save</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default function Page() {
    return (
        <Results/>
    );
}