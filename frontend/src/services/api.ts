import axios from 'axios';
import { AnalysisResult } from '../types';

const API_URL = 'http://127.0.0.1:5000/api';

export const analyzeResumeAndJob = async (resume: File, jobDescription: string): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('jobDescription', jobDescription);

  const response = await axios.post<AnalysisResult>(`${API_URL}/analyze`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: false
  });

  return response.data;
};