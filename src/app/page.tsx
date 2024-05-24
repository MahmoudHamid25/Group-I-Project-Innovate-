import Image from 'next/image'

export function Login() {
    return (
        <div>
            <a href={""}>Log in</a>
        </div>
    );
}

export function SignUp() {
    return (
        <div>
            <a href={"/registration/"}>Sign Up</a>
        </div>
    );
}

export function HamburgerMenu() {
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

export function NavBar() {
    return (
        <nav className={"navBar"}>
            <div className={"textLogo"}>
                <a href={"./"}><strong>Study</strong>Hub</a>
            </div>
            <nav className={"navMenu"}>
                <Login/>
                <SignUp/>
                <HamburgerMenu/>
            </nav>
        </nav>
    );
}

export function RecentQuizzes() {
    return (
        <div className={"recentQuizzes"}>
            <a href={""}>
                <Image
                    src="/img/49aec7c1954415a867cb8ad4685b64de.png"
                    alt="Quiz image"
                    height={180}
                    width={276}
                    style={{border: " 2px solid black"}}
                />
            </a>
            <a href={""}>
                <Image
                    src="/img/63c069664c66386e8b444d2aca2acd64.png"
                    alt="Quiz image"
                    height={180}
                    width={276}
                    style={{border: " 2px solid black"}}
                />
            </a>
            <a href={""}>
                <Image
                    src="/img/a0d2240586b0f4fe12cca2c971d68e8d.png"
                    alt="Quiz image"
                    height={180}
                    width={276}
                    style={{border: " 2px solid black"}}
                />
            </a>
            <a href={""}>
                <Image
                    src="/img/fc0a933cf1892fec611c772f32fb332d.png"
                    alt="Quiz image"
                    height={180}
                    width={276}
                    style={{border: " 2px solid black"}}
                />
            </a>
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
            <h1> Here are some Quizzes made with the use of AI for you to try out!</h1>
            <section>
                <RecentQuizzes/>
            </section>
            <h1 style={{marginRight: "25%", marginLeft: "25%", padding: "2em"}}>If you wish to explore more, join the community!</h1>
            <section style={{display: "flex", justifyContent: "space-between", marginRight: "33%", marginLeft: "23%"}}>
                <button className={"indexButton"}>Log in</button>
                <button className={"indexButton"}><a href={"/registration/"}>Sign up</a></button>
            </section>
        </section>
    );
}

export function Footer() {
    return (
        <footer>
            <div className={"footerGrid"}>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce placerat elit in quam scelerisque
                        tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum rhoncus ligula,
                        et iaculis tellus congue quis. Suspendisse potenti. Aliquam tristique eros a leo dapibus
                        tincidunt. Sed sed turpis ipsum. Mauris pharetra lobortis ex, quis tincidunt tellus egestas
                        vel.</p>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce placerat elit in quam scelerisque
                        tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum rhoncus ligula,
                        et iaculis tellus congue quis. Suspendisse potenti. Aliquam tristique eros a leo dapibus
                        tincidunt. Sed sed turpis ipsum. Mauris pharetra lobortis ex, quis tincidunt tellus egestas vel.
                    </p>
                </div>
            </div>
        </footer>

    );
}

export default function index() {
    return (
        <body>
        <NavBar/>
        <main>
            <MainContent/>
        </main>
        <Footer/>
        </body>
    );
}

