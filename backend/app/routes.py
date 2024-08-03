from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
from app.utils import allowed_file
# from app.llama_api import analyze_resume_and_job
from app.openai_api import analyze_resume_and_job
import json

bp = Blueprint('main', __name__)

@bp.route('/api/analyze', methods=['POST'])
def analyze():
    if 'resume' not in request.files:
        return jsonify({"error": "No resume file"}), 400
    
    resume = request.files['resume']
    job_description = request.form.get('jobDescription')
    
    if resume.filename == '' or not allowed_file(resume.filename):
        return jsonify({"error": "Invalid file"}), 400
    
    # Create the uploads folder if it doesn't exist
    if not os.path.exists(current_app.config['UPLOAD_FOLDER']):
        os.makedirs(current_app.config['UPLOAD_FOLDER'])

    if resume and job_description:
        print("Received resume and job description")
        filename = secure_filename(resume.filename)
        resume_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        print(f"Saving resume to {resume_path}")
        resume.save(resume_path)
        
        try:
            print("Analyzing resume and job")
            analysis_result = analyze_resume_and_job(resume_path, job_description)
            os.remove(resume_path) 
            print("Analysis complete")
            return json.loads(analysis_result)
        except Exception as e:
            # os.remove(resume_path) 
            return str(e), 500
    
    return jsonify({"error": "Invalid request"}), 400