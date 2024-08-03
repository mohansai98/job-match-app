export interface AnalysisResult {
  overall_match_percentage: number;
  overall_assessment: string;
  minimum_qualifications: Array<{
    qualification: string;
    status: 'met' | 'exceeded' | 'not met' | 'unclear';
    details: string;
  }>;
  preferred_qualifications: Array<{
    qualification: string;
    status: 'met' | 'exceeded' | 'not met' | 'unclear';
    details: string;
  }>;
  responsibilities_match: Array<{
    responsibility: string;
    match_level: 'high' | 'medium' | 'low' | 'none';
    relevant_experience: string;
  }>;
  skills_assessment: Array<{
    skill: string;
    proficiency: 'expert' | 'proficient' | 'familiar' | 'not mentioned';
    evidence: string;
  }>;
  experience_alignment: {
    years_of_relevant_experience: number;
    industry_alignment: 'high' | 'medium' | 'low';
    comments: string;
  };
  education_match: {
    degree_match: boolean;
    field_of_study_relevance: 'high' | 'medium' | 'low';
    comments: string;
  };
  additional_strengths: string[];
  areas_for_growth: string[];
  cultural_fit_indicators: string[];
  title: string;
}