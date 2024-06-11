import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
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

            const document = files.document;
            const prompt = Array.isArray(fields.prompt) ? fields.prompt[0] : fields.prompt;

            if (!document || Array.isArray(document)) {
                throw new Error('No document uploaded or multiple documents uploaded');
            }

            const documentPath = path.join(process.cwd(), 'uploads', (document as any).originalFilename || 'uploadedFile');
            const promptPath = path.join(process.cwd(), 'uploads', 'prompt.txt');

            // Save the document
            fs.copyFileSync((document as any).filepath, documentPath);
            // Save the prompt
            fs.writeFileSync(promptPath, prompt || '');

            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
