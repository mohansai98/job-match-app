import React, { useState } from 'react';
import { Layout, Typography, message, Button, Col, Row, Alert } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import FileUpload from './components/FileUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import ResultsDisplay from './components/ResultsDisplay';
import { analyzeResumeAndJob } from './services/api';
import { AnalysisResult } from './types';

const { Content } = Layout;
const { Title, Text } = Typography;

const App: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume || !jobDescription) {
      message.error('Please upload a resume and enter a job description.');
      return;
    }

    setIsLoading(true);

    try {
      const analysisResults = await analyzeResumeAndJob(resume, jobDescription);
      setResults(analysisResults);
      message.success('Analysis completed successfully!');
    } catch (err) {
      message.error('An error occurred while analyzing the resume and job description.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '20px', maxWidth: '100%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Job Match Analyzer</Title>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} md={12}>
            <FileUpload onFileSelect={setResume} />
          </Col>
          <Col xs={24} md={12}>
            <JobDescriptionInput onDescriptionChange={setJobDescription} />
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
          <Col xs={24} style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              icon={<FileSearchOutlined />}
              onClick={handleSubmit}
              loading={isLoading}
              size="large"
            >
              {isLoading ? 'Analyzing...' : 'Analyze'}
            </Button>
          </Col>
          </Row>
          {results && (
            <Col xs={24}>
              <Alert
              description={
                <div>
                  The analysis is performed by <Text mark>Generative AI</Text> and may not be completely accurate.
                </div>
              }              
              type="warning"
              showIcon
              style={{ marginTop: 24, marginBottom: 24 }}
            />
              <ResultsDisplay results={results} />
            </Col>
          )}
      </Content>
    </Layout>
  );
};

export default App;