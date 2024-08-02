import React from 'react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
        Job Description
      </label>
      <textarea
        id="jobDescription"
        value={value}
        onChange={onChange}
        rows={6}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        placeholder="Paste the job description here..."
      ></textarea>
    </div>
  );
};