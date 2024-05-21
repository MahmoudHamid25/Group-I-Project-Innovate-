import Image from 'next/image'
import {Main} from "next/document";

function Login() {
    return (
        <div>
            <a href={""}>Log in</a>
        </div>
    );
}

function SignUp() {
    return (
        <div>
            <a href={""}>Sign Up</a>
        </div>
    );
}

function HamburgerMenu() {
    return (
        <a href={""}>
            <Image
                src="/img/menulines.svg"
                alt="Hamburger Menu"
                height={18}
                width={32}
            />
        </a>
    );
}

function NavBar() {
    return (
        <nav className={"navBar"}>
            <div className={"textLogo"}>
                <a href={"index"}><strong>Study</strong>Hub</a>
            </div>
            <nav className={"navMenu"}>
                <Login/>
                <SignUp/>
                <HamburgerMenu/>
            </nav>
        </nav>
    );
}

function RecentQuizzes()


{
    return(
      <div className={"recentQuizzes"}>

      </div>
    );
}

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
            <h1> Here are some Quizes made with the use of AI for you to try out!</h1>
            <section>

            </section>
        </section>
    );
}

export default function index() {
    return (
        <body>
        <main>
            <NavBar/>
            <MainContent/>
        </main>
        </body>
    );
}

