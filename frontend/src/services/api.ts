import axios from 'axios';
import { AnalysisResult } from '../types';

const apiUrl = process.env.REACT_APP_API_URL;

export const analyzeResumeAndJob = async (resume: File, jobDescription: string): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('jobDescription', jobDescription);

  const response = await axios.post<AnalysisResult>(`${apiUrl}/api/analyze`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: false
  });

  return response.data;
};