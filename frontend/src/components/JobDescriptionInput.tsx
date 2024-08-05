import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

interface JobDescriptionInputProps {
  onDescriptionChange: (description: string) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ onDescriptionChange }) => {
  return (
    <div>
      <h3>Job Description</h3>
      <TextArea
        name='jobDescription'
        rows={8}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Paste the job description here..."
      />
    </div>
  );
};

export default JobDescriptionInput;