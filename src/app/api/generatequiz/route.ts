import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

export const config = {
    api: {
        bodyParser: false, 
    },
};

const parseForm = (req: NextApiRequest): Promise<{ fields: Fields; files: Files }> => {
    const form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method === 'POST') {
        try {
            const { fields, files } = await parseForm(req);
            const formData = new FormData();

            // Append form fields
            for (const key in fields) {
                const fieldValue = fields[key];
                if (Array.isArray(fieldValue)) {
                    fieldValue.forEach(value => formData.append(key, value as string));
                } else if (fieldValue) {
                    formData.append(key, fieldValue as string);
                }
            }

            // Append files
            if (files.document) {
                const fileArray = Array.isArray(files.document) ? files.document : [files.document];
                fileArray.forEach(file => {
                    if (file.filepath) {
                        formData.append('document', fs.createReadStream(file.filepath), file.originalFilename || file.newFilename || 'unknown');
                    }
                });
            }

            const response = await fetch('http://127.0.0.1:5003/generate_quiz', {
                method: 'POST',
                body: formData,
                headers: formData.getHeaders(),
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
