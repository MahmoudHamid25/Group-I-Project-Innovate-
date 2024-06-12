import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'qwerty',
        database: 'StudyHub'
    });

    try {
        const [quizRows]: any = await connection.execute('SELECT * FROM Quizzes WHERE id = ?', [id]);
        if (quizRows.length === 0) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const quiz = quizRows[0];

        const [questionRows]: any = await connection.execute('SELECT * FROM Questions WHERE quiz_id = ?', [id]);
        const questions = [];

        for (const question of questionRows) {
            const [answerRows]: any = await connection.execute('SELECT * FROM Answers WHERE question_id = ?', [question.id]);
            questions.push({
                ...question,
                answers: answerRows
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
