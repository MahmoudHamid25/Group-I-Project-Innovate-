import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, since we'll handle it manually
    },
};

const parseForm = (req: NextApiRequest): Promise<{ fields: Fields; files: Files }> => {
    const form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            } else {
                resolve({ fields, files });
            }
        });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { fields, files } = await parseForm(req);

            if (!files.document || Array.isArray(files.document)) {
                throw new Error('No document uploaded or multiple documents uploaded');
            }

            const prompt = Array.isArray(fields.prompt) ? fields.prompt[0] : fields.prompt;

            const formData = new FormData();
            formData.append('prompt', prompt as string);
            formData.append('document', fs.createReadStream((files.document as any).filepath) as any);

            const response = await fetch('http://127.0.0.1:5003/generate_quiz', {
                method: 'POST',
                body: formData as any, // Use `as any` to satisfy TypeScript
            });

            const data = await response.json();
            res.status(response.status).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate quiz', details: (error as Error).message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
