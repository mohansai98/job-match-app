import React from 'react';
import { AnalysisResult } from '../types';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Overall Match: {result.overall_match_percentage}%
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {result.overall_assessment}
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Education Match</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {result.education_match.degree_match ? 'Matched' : 'Not Matched'} - 
                {result.education_match.comments}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Experience Alignment</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {result.experience_alignment.industry_alignment} - 
                {result.experience_alignment.years_of_relevant_experience} years relevant experience
              </dd>
            </div>
            {/* Add more sections for skills, qualifications, etc. */}
          </dl>
        </div>
      </div>
    </div>
  );
};