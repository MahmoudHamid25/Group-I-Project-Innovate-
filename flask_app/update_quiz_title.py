import openai
import os
from dotenv import load_dotenv
import mysql.connector
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# Set up OpenAI API key from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

def get_latest_quiz():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="qwerty",
            database="StudyHub"
        )
        cursor = conn.cursor()
        cursor.execute("SELECT id, name FROM Quizzes ORDER BY id DESC LIMIT 1")
        result = cursor.fetchone()
        conn.close()
        return result
    except mysql.connector.Error as err:
        logger.error(f"Database error: {err}")
        raise

def update_quiz_title(quiz_id, new_title):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="qwerty",
            database="StudyHub"
        )
        cursor = conn.cursor()
        cursor.execute("UPDATE Quizzes SET name = %s WHERE id = %s", (new_title, quiz_id))
        conn.commit()
        conn.close()
    except mysql.connector.Error as err:
        logger.error(f"Database error: {err}")
        raise

def generate_quiz_title(document_text):
    prompt = f"""
    Based on the following document content, generate a suitable and catchy title for a quiz:

    Document:
    {document_text}
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # or "gpt-4" if you have access to it
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=50,
            temperature=0.7
        )
        title = response['choices'][0]['message']['content'].strip()
        return title
    except openai.error.OpenAIError as e:
        logger.error(f"OpenAI API error: {e}")
        raise

if __name__ == '__main__':
    try:
        # Get the latest quiz
        quiz = get_latest_quiz()
        if quiz:
            quiz_id, _ = quiz
           
