import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'qwerty',
        database: 'StudyHub',
    });

    try {
        // Get the last quiz
        const [quizRows]: [any[], any] = await connection.execute('SELECT * FROM Quizzes ORDER BY id DESC LIMIT 1');
        if (quizRows.length === 0) {
            return res.status(404).json({ error: 'No quizzes found' });
        }
        const quiz = quizRows[0];

        // Get questions for the quiz
        const [questionRows]: [any[], any] = await connection.execute('SELECT * FROM Questions WHERE quiz_id = ?', [quiz.id]);
        const questions = [];

        for (const question of questionRows) {
            const [answerRows]: [any[], any] = await connection.execute('SELECT * FROM Answers WHERE question_id = ?', [question.id]);
            questions.push({
                ...question,
                answers: answerRows,
            });
        }

        quiz.questions = questions;

        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load quiz' });
    } finally {
        await connection.end();
    }
}
