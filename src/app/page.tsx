import {RecentQuizzes} from "@/app/components/recentquizzes";


function MainContent() {
    return (
        <section className={"mainContent"}>
            <div className={"mainText"}>
                <h1>This is <strong>Study</strong>Hub</h1>
                <p>
                    Welcome to StudyHub, your personalised exam preparation partner. Using advanced AI, we transform your
                    study materials into custom mock exams, providing immediate feedback and tracking your progress. Engage
                    with interactive features like leaderboards and flashcards, and connect with peers for a collaborative
                    learning experience. StudyHub – tailored learning for your success.
                </p>
            </div>
            <section className={"quizzText"}>
                <h1> Here are some Quizzes made with the use of AI for you to try out!</h1>
                <RecentQuizzes/>
            </section>
            <div className={"sideText"}>
                <h1>If you wish to explore more, join the community!</h1>
            <section className={"signinSignout"} >
                <button className={"indexButtonHomePage"}><a href={"/login"}>Log in</a> </button>
                <button className={"indexButtonHomePage"}><a href={"/registration/"}>Sign up</a></button>
            </section>
            </div>
        </section>
    );
}

export default function index() {
    return (
            <MainContent/>
    );
}

