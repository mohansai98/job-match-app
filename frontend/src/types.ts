export interface AnalysisResult {
    overall_match_percentage: number;
    overall_assessment: string;
    education_match: {
      degree_match: boolean;
      comments: string;
      field_of_study_relevance: string;
    };
    experience_alignment: {
      industry_alignment: string;
      years_of_relevant_experience: number;
      comments: string;
    };
    skills_assessment: Array<{
      skill: string;
      proficiency: string;
      evidence: string;
    }>;
    // Add more fields as needed based on your backend response
  }