import Image from "next/image";
import "@/app/globals.css";

export function RecentQuizzes() {
    return (
        <div className={"recentQuizzes"}>
            <a href={"quiz/40"}>
                <Image
                    src="/img/49aec7c1954415a867cb8ad4685b64de.png"
                    alt="Quiz image"
                    height={180}
                    width={276}
                    style={{border: " 2px solid black"}}
                />
            </a>
            <a href={"quiz/41"}>
                <Image
                    src="/img/63c069664c66386e8b444d2aca2acd64.png"
                    alt="Quiz image"
                    height={180}
                    width={276}
                    style={{border: " 2px solid black"}}
                />
            </a>
            <a href={"quiz/44"}>
                <Image
                    src="/img/a0d2240586b0f4fe12cca2c971d68e8d.png"
                    alt="Quiz image"
                    height={180}
                    width={276}
                    style={{border: " 2px solid black"}}
                />
            </a>
            <a href={"quiz/42"}>
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