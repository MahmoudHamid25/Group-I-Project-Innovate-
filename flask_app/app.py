from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
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
CORS(app, resources={r"/generate_quiz": {"origins": "http://localhost:3000"}})

app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'txt', 'pdf', 'docx', 'md'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def extract_text_from_file(filename):
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    content = ""
    try:
        if filepath.endswith('.txt'):
            with open(filepath, 'r') as f:
                content = f.read()
        elif filepath.endswith('.pdf'):
            with open(filepath, 'rb') as f:
                reader = PyPDF2.PdfFileReader(f)
                for page_num in range(reader.numPages):
                    page = reader.getPage(page_num)
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

def parse_quiz_content(quiz_content):
    questions_answers = {}
    lines = quiz_content.split('\n')
    question = None
    answers = []

    for line in lines:
        line = line.strip()
        if line.startswith('1.') or line.startswith('2.') or line.startswith('3.') or line.startswith('4.') or line.startswith('5.') or line.startswith('6.') or line.startswith('7.'):
            if question:
                questions_answers[question] = answers
            question = line
            answers = []
        elif line.startswith('A)') or line.startswith('B)') or line.startswith('C)') or line.startswith('D)'):
            is_correct = '(correct)' in line.lower()
            answer_text = line.replace('(correct)', '').strip()
            answers.append((answer_text, is_correct))

    if question:
        questions_answers[question] = answers

    return questions_answers

def save_quiz_to_db(quiz_title, questions_answers):
    conn = None
    try:
        conn = mysql.connector.connect(host="localhost", user="root", password="qwerty", database="StudyHub")
        cursor = conn.cursor()

        logger.info(f"Inserting quiz titled '{quiz_title}' into database...")
        cursor.execute("INSERT INTO Quizzes (name) VALUES (%s)", (quiz_title,))
        quiz_id = cursor.lastrowid
        conn.commit()
        logger.info(f"Quiz inserted with ID {quiz_id}")

        for question, answers in questions_answers.items():
            logger.info(f"Inserting question: {question}")
            cursor.execute("INSERT INTO Questions (quiz_id, question_text) VALUES (%s, %s)", (quiz_id, question))
            question_id = cursor.lastrowid
            for answer, is_correct in answers:
                cursor.execute("INSERT INTO Answers (question_id, answer_text, is_correct) VALUES (%s, %s, %s)", (question_id, answer, is_correct))
            conn.commit()
            logger.info(f"Inserted answer for question ID {question_id}")

        return quiz_id
    except mysql.connector.Error as err:
        conn.rollback() if conn else None
        logger.error(f"Database error during insert: {err}")
        raise
    finally:
        if conn:
            conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    logger.info("Received POST request to /generate_quiz")
    try:
        file = request.files['document']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)  # Save file to the correct directory
            logger.info(f"File saved to {file_path}")

            document_text = extract_text_from_file(filename)
            prompt = request.form.get('prompt', 'Default prompt if none provided')
            quiz_name = request.form.get('quiz_name', 'Default quiz name')
            logger.info(f"Received prompt: {prompt}")
            logger.info(f"Received quiz name: {quiz_name}")

            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Generate a quiz based on the document: {document_text} Prompt: {prompt}"}
                ],
                max_tokens=1024,
                temperature=0.7
            )

            quiz_content = response.choices[0].message['content'].strip()
            logger.info(f"Quiz content from OpenAI: {quiz_content}")
            questions_answers = parse_quiz_content(quiz_content)
            logger.info(f"Parsed questions and answers: {questions_answers}")

            quiz_id = save_quiz_to_db(quiz_name, questions_answers)
            logger.info(f"Quiz saved with ID: {quiz_id}")

            return jsonify({'message': 'Quiz generated successfully!', 'quiz_content': quiz_content})
        else:
            return jsonify({'error': 'Invalid or no file provided'}), 400

    except Exception as e:
        logger.error(f"OpenAI API error received: {str(e)}")
        return jsonify({'error': 'Failed to generate quiz', 'details': str(e)}), 500

@app.route('/update_quiz_title', methods=['POST'])
def update_quiz_title():
    try:
        quiz_id = request.form['quiz_id']
        quiz_name = request.form['quiz_name']

        conn = mysql.connector.connect(host="localhost", user="root", password="qwerty", database="StudyHub")
        cursor = conn.cursor()
        cursor.execute("UPDATE Quizzes SET name = %s WHERE id = %s", (quiz_name, quiz_id))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Quiz title updated successfully.'})
    except mysql.connector.Error as err:
        logger.error(f"Database error: {err}")
        return jsonify({'error': 'Failed to update quiz title.', 'details': str(err)}), 500

if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True, host='0.0.0.0', port=5003)
