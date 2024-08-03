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
        rows={9}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Paste the job description here..."
      />
    </div>
  );
};

export default JobDescriptionInput;