import axios from 'axios';
import { AnalysisResult } from '../types';

const API_URL = 'http://localhost:8000/api/analyze';

export const analyzeResumeAndJob = async (resume: File, jobDescription: string): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('jobDescription', jobDescription);

  const response = await axios.post<AnalysisResult>(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: false
  });

  return response.data;
};