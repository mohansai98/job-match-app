from openai import OpenAI
from docx import Document
import pdfplumber
from flask import current_app

def extract_text(file_path):
    if file_path.endswith('.pdf'):
        return extract_text_from_pdf(file_path)
    elif file_path.endswith('.docx'):
        return extract_text_from_docx(file_path)
    elif file_path.endswith('.txt'):
        return extract_text_from_txt(file_path)
    else:
        raise ValueError("Unsupported file type")

def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

def extract_text_from_docx(file_path):
    doc = Document(file_path)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

def extract_text_from_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
    return text

def analyze_resume_and_job(resume_path, job_description):

    resume = extract_text(resume_path)
    content = f"""
Please analyze the job fit for the following candidate and position:

Candidate Name: [Insert candidate name]
Job Title: [Insert job title]
Company Name: [Insert company name]

Resume:
{resume}

Job Description:
{job_description}

Provide a comprehensive analysis of the candidate's fit for the position, including an assessment of qualifications, skills, experience, and potential cultural fit. Calculate an overall match percentage and provide a thorough overall assessment.
Provide every parameter mentioned in the function
"""
    
    api_request_json = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": "You are an AI assistant specialized in analyzing job fit for candidates based on their resume and job descriptions."},
            {"role": "user", "content": content}
        ],
        "functions": [
            {
                "name": "AnalyzeJobFit",
                "description": "Analyzes the fit of a candidate for a specific job position based on their resume and the job description",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "title": "Analysis Title",
                            "description": "Analysis title including candidate name and job position",
                            "type": "string"
                        },
                        "minimum_qualifications": {
                            "title": "Minimum Qualifications",
                            "description": "Analysis of minimum job qualifications",
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "qualification": {"type": "string"},
                                    "status": {"type": "string", "enum": ["met", "exceeded", "not met", "unclear"]},
                                    "details": {"type": "string"}
                                }
                            }
                        },
                        "preferred_qualifications": {
                            "title": "Preferred Qualifications",
                            "description": "Analysis of preferred job qualifications",
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "qualification": {"type": "string"},
                                    "status": {"type": "string", "enum": ["met", "exceeded", "not met", "unclear"]},
                                    "details": {"type": "string"}
                                }
                            }
                        },
                        "responsibilities_match": {
                            "title": "Responsibilities Match",
                            "description": "Analysis of how well the candidate's experience matches job responsibilities",
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "responsibility": {"type": "string"},
                                    "match_level": {"type": "string", "enum": ["high", "medium", "low", "none"]},
                                    "relevant_experience": {"type": "string"}
                                }
                            }
                        },
                        "skills_assessment": {
                            "title": "Skills Assessment",
                            "description": "Evaluation of candidate's relevant skills",
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "skill": {"type": "string"},
                                    "proficiency": {"type": "string", "enum": ["expert", "proficient", "familiar", "not mentioned"]},
                                    "evidence": {"type": "string"}
                                }
                            }
                        },
                        "experience_alignment": {
                            "title": "Experience Alignment",
                            "description": "Assessment of candidate's relevant experience",
                            "type": "object",
                            "properties": {
                                "years_of_relevant_experience": {"type": "number"},
                                "industry_alignment": {"type": "string", "enum": ["high", "medium", "low"]},
                                "comments": {"type": "string"}
                            }
                        },
                        "education_match": {
                            "title": "Education Match",
                            "description": "Evaluation of candidate's education in relation to job requirements",
                            "type": "object",
                            "properties": {
                                "degree_match": {"type": "boolean"},
                                "field_of_study_relevance": {"type": "string", "enum": ["high", "medium", "low"]},
                                "comments": {"type": "string"}
                            }
                        },
                        "additional_strengths": {
                            "title": "Additional Strengths",
                            "description": "Candidate's strengths not explicitly requested in job description",
                            "type": "array",
                            "items": {"type": "string"}
                        },
                        "areas_for_growth": {
                            "title": "Areas for Growth",
                            "description": "Potential areas for candidate's professional development",
                            "type": "array",
                            "items": {"type": "string"}
                        },
                        "cultural_fit_indicators": {
                            "title": "Cultural Fit Indicators",
                            "description": "Potential indicators of cultural fit",
                            "type": "array",
                            "items": {"type": "string"}
                        },
                        "overall_match_percentage": {
                            "title": "Overall Match Percentage",
                            "description": "Overall match percentage (0-100)",
                            "type": "number"
                        },
                        "overall_assessment": {
                            "title": "Overall Assessment",
                            "description": "Summary assessment of candidate's fit for the position",
                            "type": "string"
                        }
                    },
                    "required": ["title", "minimum_qualifications", "preferred_qualifications", "responsibilities_match", "overall_match_percentage", "overall_assessment"]
                }
            }
        ],
        'function_call': {'name': 'AnalyzeJobFit'},
        'max_tokens': 16384,
    }
    client = OpenAI()
    response = client.chat.completions.create(**api_request_json)
    res = response.choices[0].message.function_call.arguments
    return res
