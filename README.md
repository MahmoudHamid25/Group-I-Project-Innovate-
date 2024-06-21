Certainly! Here is the updated README with more detailed instructions for setting up the OpenAI API key:

---

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

## Setting Up OpenAI API

To run this project, you will need an OpenAI API key. Follow these steps to get the API key and set it up:

### 1. Sign Up and Get API Key
1. Visit the [OpenAI website](https://www.openai.com/).
2. Click on the "Get Started" button and sign up for an account if you don't have one already.
3. After logging in, go to the API section from your account dashboard.
4. Click on "Create new secret key" to generate a new API key.
5. Copy the API key to a secure location as you will need it in the next steps.

### 2. Create a `.env` File
1. Navigate to the root directory of the `flask_app` (where your Flask application resides).
2. Create a new file named `.env` if it does not already exist.
3. Open the `.env` file in your text editor and add your OpenAI API key in the following format:
    ```bash
    OPENAI_API_KEY=your_openai_api_key_here
    ```

### 3. Ensure Environment Variables are Loaded
1. Make sure your Flask application is configured to load environment variables from the `.env` file. This should be handled automatically by the `python-dotenv` package included in your setup.
2. Your `app.py` or the main Python file where the Flask app is initiated should include:
    ```python
    from dotenv import load_dotenv
    import os

    load_dotenv()  # Load environment variables from .env file
    openai_api_key = os.getenv("OPENAI_API_KEY")
    ```
3. Ensure the Flask app uses this `openai_api_key` to authenticate API requests to OpenAI.

### 4. Verify Setup
1. Run your Flask application to ensure there are no errors related to the OpenAI API key.
    ```bash
    python flask_app/app.py
    ```
2. Check the functionality that requires the OpenAI API to verify it is working correctly.

With these steps completed, your Flask application will have access to the OpenAI API key and can use it for making requests to the OpenAI API.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---
