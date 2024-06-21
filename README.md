This is a [Next.js](https://nextjs.org/) and Python project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First you need Next.js and Node.js (since sometimes the Next.js's node.js library does not work)

Node.js needs their path to be manually set.
After that install python3 with the Flask library
Open VSC or Webstorm.
Let the npm install the packages provided by the project.
Then install python packages to make the python side of the project work.
```bash
pip install openai==0.28
pip install python-dotenv
pip install PyPDF2
pip install python-docx
pip install MySQL-connector-python
pip install Flask-CORS
Open docker or xampp and be sure that it runs
and last do in the terminal of the project the command 
python flask_app/app.py
since port 5003 is a flask server
```
then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

If it doesn't work yet then make sure you have the Studyhub.db imported in mySQL program and that the db.ts has the credentials used by you to connect to the localhost of mysql

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
