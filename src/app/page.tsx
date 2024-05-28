import {RecentQuizzes} from "@/app/components/recentquizzes";

function MainContent() {
    return (
        <section className={"mainContent"}>
            <h1>This is <strong>Study</strong>Hub</h1>
            <p style={{marginRight: '33%'}}>
                Welcome to StudyHub, your personalised exam preparation partner. Using advanced AI, we transform your
                study materials into custom mock exams, providing immediate feedback and tracking your progress. Engage
                with interactive features like leaderboards and flashcards, and connect with peers for a collaborative
                learning experience. StudyHub – tailored learning for your success.
            </p>
            <h1> Here are some Quizzes made with the use of AI for you to try out!</h1>
            <section>
                <RecentQuizzes/>
            </section>
            <h1 style={{marginRight: "25%", marginLeft: "25%", padding: "2em"}}>If you wish to explore more, join the community!</h1>
            <section style={{display: "flex", justifyContent: "space-between", marginRight: "33%", marginLeft: "23%"}}>
                <button className={"indexButton"}><a href={"/login/"}>Log in</a></button>
                <button className={"indexButton"}><a href={"/registration/"}>Sign up</a></button>
            </section>
        </section>
    );
}

export default function index() {
    return (
            <MainContent/>
    );
}

