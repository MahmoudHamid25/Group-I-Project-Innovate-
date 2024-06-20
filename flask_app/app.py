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
import re
import random

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# Set up OpenAI API key from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)

# CORS configuration
cors = CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:3000",
        "supports_credentials": True
    }
})

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

def parse_quiz_content(quiz_content):
    questions_answers = {}
    lines = quiz_content.split('\n')
    question_pattern = re.compile(r'Q: (.+)')
    answer_pattern = re.compile(r'A\d: (.+) \((correct|Correct|incorrect|Incorrect)\)')

    question = None
    answers = []

    for line in lines:
        line = line.strip()
        question_match = question_pattern.match(line)
        answer_match = answer_pattern.match(line)

        if question_match:
            # Save the previous question and its answers if valid
            if question and answers:
                correct_answers = [a for a in answers if a[1]]
                incorrect_answers = [a for a in answers if not a[1]]
                if correct_answers and incorrect_answers:
                    random.shuffle(answers)  # Shuffle answers
                    questions_answers[question] = answers
            question = question_match.group(1)
            answers = []
        elif answer_match:
            answer_text = answer_match.group(1).strip()
            is_correct = answer_match.group(2).lower() == 'correct'
            answers.append((answer_text, is_correct))

    # Save the last question and its answers if valid
    if question and answers:
        correct_answers = [a for a in answers if a[1]]
        incorrect_answers = [a for a in answers if not a[1]]
        if correct_answers and incorrect_answers:
            random.shuffle(answers)  # Shuffle answers
            questions_answers[question] = answers

    # Filter out invalid questions or answers
    questions_answers = {q: a for q, a in questions_answers.items() if q and a and len(a) > 1}

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
            conn.commit()
            logger.info(f"Question inserted with ID {question_id}")

            for answer, is_correct in answers:
                is_correct_value = 1 if is_correct else 0  # Convert to integer
                logger.info(f"Inserting answer: {answer}, Is Correct: {is_correct_value}")
                cursor.execute("INSERT INTO Answers (question_id, answer_text, is_correct) VALUES (%s, %s, %s)", (question_id, answer, is_correct_value))
                conn.commit()
                logger.info(f"Answer inserted for question ID {question_id}")

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

            # Ensure the document text fits within the token limit
            max_token_length = 15000  # Set a limit to avoid exceeding the API's token limit
            if len(document_text) > max_token_length:
                document_text = document_text[:max_token_length]
                logger.warning("Document text truncated to fit within token limit")

            prompt = request.form.get('prompt', 'Default prompt if none provided')
            quiz_name = request.form.get('quiz_name', 'Default quiz name')
            logger.info(f"Received prompt: {prompt}")
            logger.info(f"Received quiz name: {quiz_name}")

            detailed_prompt = f"""
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

            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": detailed_prompt}
                ],
                max_tokens=1024,
                temperature=0.7
            )

            quiz_content = response.choices[0].message['content'].strip()
            logger.info(f"Quiz content from OpenAI: {quiz_content}")
            questions_answers = parse_quiz_content(quiz_content)
            logger.info(f"Parsed questions and answers: {questions_answers}")

            # Check if questions and answers are correctly parsed
            if not questions_answers:
                logger.error('No questions and answers parsed from quiz content')
                return jsonify({'error': 'Failed to parse questions and answers from quiz content'}), 500

            quiz_id = save_quiz_to_db(quiz_name, questions_answers)
            logger.info(f"Quiz saved with ID: {quiz_id}")

            return jsonify({'message': 'Quiz generated successfully!', 'quiz_content': quiz_content, 'quiz_id': quiz_id})
        else:
            return jsonify({'error': 'Invalid or no file provided'}), 400

    except Exception as e:
        logger.error(f"OpenAI API error received: {str(e)}")
        return jsonify({'error': 'Failed to generate quiz', 'details': str(e)}), 500

@app.route('/quizzes', methods=['GET'])
def get_quizzes():
    conn = None
    try:
        conn = mysql.connector.connect(host="localhost", user="root", password="qwerty", database="StudyHub")
        cursor = conn.cursor(dictionary=True)  # Use dictionary=True to return results as dictionaries
        cursor.execute("SELECT id, name FROM Quizzes")
        quizzes = cursor.fetchall()  # Fetch all quiz records

        return jsonify(quizzes)  # Return quizzes as a JSON response
    except mysql.connector.Error as err:
        logger.error(f"Database error: {err}")
        return jsonify({'error': 'Failed to fetch quizzes.', 'details': str(err)}), 500
    finally:
        if conn:
            conn.close()  # Ensure the connection is closed after completing the query

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

@app.route('/quiz/<int:quiz_id>', methods=['GET'])
def get_quiz(quiz_id):
    conn = None
    try:
        conn = mysql.connector.connect(host="localhost", user="root", password="qwerty", database="StudyHub")
        cursor = conn.cursor(dictionary=True)

        # Fetch quiz name
        cursor.execute("SELECT name FROM Quizzes WHERE id = %s", (quiz_id,))
        quiz = cursor.fetchone()
        if not quiz:
            return jsonify({'error': 'Quiz not found.'}), 404

        # Fetch questions and answers
        cursor.execute("""
            SELECT q.id AS question_id, q.question_text, a.id AS answer_id, a.answer_text, a.is_correct
            FROM Questions q
            JOIN Answers a ON q.id = a.question_id
            WHERE q.quiz_id = %s
        """, (quiz_id,))
        results = cursor.fetchall()

        questions = {}
        for row in results:
            question_id = row['question_id']
            if question_id not in questions:
                questions[question_id] = {
                    'id': question_id,
                    'question_text': row['question_text'],
                    'answers': []
                }
            questions[question_id]['answers'].append({
                'id': row['answer_id'],
                'answer_text': row['answer_text'],
                'is_correct': row['is_correct']
            })

        return jsonify({'quizName': quiz['name'], 'questions': list(questions.values())})

    except mysql.connector.Error as err:
        logger.error(f"Database error: {err}")
        return jsonify({'error': 'Failed to fetch quiz.', 'details': str(err)}), 500
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True, host='0.0.0.0', port=5003)
