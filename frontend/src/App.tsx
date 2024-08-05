import React, { useState, useRef, useEffect } from 'react';
import { Layout, Typography, message, Button, Col, Row, Alert, Image } from 'antd';
import { FileSearchOutlined, LinkedinFilled } from '@ant-design/icons';
import FileUpload from './components/FileUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import ResultsDisplay from './components/ResultsDisplay';
import { analyzeResumeAndJob } from './services/api';
import { AnalysisResult } from './types';
import logo from './logo.svg';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const App: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (resultsRef.current && results) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [results]);

  return (
    <Layout style={{ display:'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#1677FF', display: 'flex', width: '100%', padding: 0 }}>
          <a href='/'><Image src={logo} alt="Job Match Analyzer" preview={false} width={120} height={60} /></a>
      </Header>
      <Content style={{ padding: '20px', maxWidth: '100%'}}>
        <Title style={{ textAlign: 'center'}}>Job Match Analyzer</Title>
        <Paragraph style={{ textAlign: 'center', marginBottom: '24px' }}>
          Upload your resume and paste a job description to see how well you match the position. 
          Our AI-powered tool will analyze your qualifications against the job requirements and provide detailed insights.
        </Paragraph>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <FileUpload onFileSelect={setResume} />
          </Col>
          <Col xs={24} md={12}>
            <JobDescriptionInput onDescriptionChange={setJobDescription} />
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
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
            <div ref={resultsRef}>
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
            </div>
          </Col>
        )}
      </Content>
      <Footer style={{ textAlign: 'center', bottom: 0 }}>
        <div>Job Match Analyzer ©{new Date().getFullYear()}</div>
        <div>Connect on <a href="https://www.linkedin.com/in/mohan-sai-singu/" target="_blank" rel="noopener noreferrer"><LinkedinFilled /></a></div>      
      </Footer>
    </Layout>
  );
};

export default App;