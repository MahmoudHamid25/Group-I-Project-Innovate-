import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
    api: {
        bodyParser: false, 
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method === 'POST') {
        try {
            const response = await fetch('http://localhost:5000/generate_quiz', {
                method: 'POST',
                body: req.body,
                headers: {
                    'Content-Type': req.headers['content-type'] || '',
                },
            });
            const data = await response.json();
            res.status(response.status).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate quiz' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
