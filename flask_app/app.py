import subprocess
from flask import Flask, request, jsonify, render_template, redirect, url_for
import openai
import os
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import PyPDF2
from docx import Document
import mysql.connector
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# Set up OpenAI API key from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'txt', 'pdf', 'docx', 'md'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def extract_text_from_file(filepath):
    content = ""
    try:
        if filepath.endswith('.txt'):
            with open(filepath, 'r') as f:
                content = f.read()
        elif filepath.endswith('.pdf'):
            with open(filepath, 'rb') as f:
                reader = PyPDF2.PdfReader(f)
                for page_num in range(len(reader.pages)):
                    page = reader.pages[page_num]
                    content += page.extract_text()
        elif filepath.endswith('.docx'):
            doc = Document(filepath)
            for para in doc.paragraphs:
                content += para.text + '\n'
        elif filepath.endswith('.md'):
            with open(filepath, 'r') as f:
                content = f.read()
    except Exception as e:
        logger.error(f"Error extracting text from file: {e}")
        raise
    return content

def save_quiz_to_db(quiz_title, questions_answers):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="qwerty",
            database="StudyHub"
        )
        cursor = conn.cursor()

        # Insert the quiz
        cursor.execute("INSERT INTO Quizzes (name) VALUES (%s)", (quiz_title,))
        quiz_id = cursor.lastrowid
        logger.info(f"Inserted quiz with ID: {quiz_id}")

        # Insert the questions and answers
        for question, answers in questions_answers.items():
            cursor.execute("INSERT INTO Questions (quiz_id, question_text) VALUES (%s, %s)", (quiz_id, question))
            question_id = cursor.lastrowid
            logger.info(f"Inserted question with ID: {question_id}")
            for answer, is_correct in answers:
                cursor.execute("INSERT INTO Answers (question_id, answer_text, is_correct) VALUES (%s, %s, %s)", (question_id, answer, is_correct))
                logger.info(f"Inserted answer for question ID: {question_id}")

        conn.commit()
    except mysql.connector.Error as err:
        logger.error(f"Database error: {err}")
        raise
    finally:
        cursor.close()
        conn.close()

@app.route('/')
def index():
    return render_template('upload.html')

@app.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    try:
        if 'document' not in request.files:
            return render_template('upload.html', error='No document part')
        file = request.files['document']
        if file.filename == '':
            return render_template('upload.html', error='No selected file')
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            # Extract text from the file
            document_text = extract_text_from_file(filepath)
            
            prompt = request.form['prompt']
            
            # Combine the document content and the prompt
            combined_prompt = f"""
            Generate a quiz based on the following document. The quiz should contain questions with multiple-choice answers, and indicate the correct answer clearly.

            Document:
            {document_text}

            Prompt:
            {prompt}

            Format the response as follows:
            Q: [question]
            A1: [answer 1] (correct) / (incorrect)
            A2: [answer 2] (correct) / (incorrect)
            A3: [answer 3] (correct) / (incorrect)
            A4: [answer 4] (correct) / (incorrect)
            """
            
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",  # or "gpt-4" if you have access to it
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": combined_prompt}
                    ],
                    max_tokens=1024,
                    temperature=0.7
                )
                quiz_content = response['choices'][0]['message']['content'].strip()

                # Parse the quiz content into questions and answers
                questions_answers = {}
                lines = quiz_content.split('\n')
                question = None
                for line in lines:
                    if line.startswith('Q:'):
                        question = line[2:].strip()
                        questions_answers[question] = []
                    elif line.startswith('A') and question:
                        answer_text = line[3:].strip()
                        is_correct = '(correct)' in answer_text.lower()
                        answer_text = answer_text.replace('(correct)', '').replace('(incorrect)', '').strip()
                        questions_answers[question].append((answer_text, is_correct))
                
                quiz_title = "Temporary Title"  # Temporary title

                # Save the quiz to the database
                save_quiz_to_db(quiz_title, questions_answers)

                # # Trigger the second script to update the quiz title
                # subprocess.run(["python3", "update_quiz_title.py"])

                return jsonify({'message': 'Quiz generated and saved successfully.'})
            except openai.error.OpenAIError as e:
                logger.error(f"OpenAI API error: {e}")
                return render_template('upload.html', error='Failed to generate quiz. Please try again later.')
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        return render_template('upload.html', error='Internal Server Error')

    return render_template('upload.html', error='File not allowed')

@app.route('/test_db_connection', methods=['GET'])
def test_db_connection():
    try:
        # Attempt to establish a database connection
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="qwerty",
            database="StudyHub"
        )
        conn.close()
        return jsonify({'message': 'Database connection successful!'}), 200
    except mysql.connector.Error as err:
        logger.error(f"Database connection error: {err}")
        return jsonify({'error': 'Database connection failed!', 'details': str(err)}), 500

if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True, host='0.0.0.0', port=5003)
