"use client"
import { useEffect, useState } from 'react';

export default function Leaderboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/leaderboard');
            const data = await res.json();
            setData(data);
        }

        fetchData();
    }, []);

    return (
        <div className="leaderboard-container">
            <h1 className="leaderboard-title">Leaderboard</h1>
            <div className="leaderboard-cards">
                {data.length !== 0 &&
                    data.map((row: any, i) => (
                        <div className="leaderboard-card" key={i}>
                            <div className="position">{i + 1}.</div>
                            <div className="name">{row.nickname}</div>
                            <div className="score">Score: {row.score}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
