import React from 'react';
import { AnalysisResult } from '../types';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Badge, Tooltip, Progress, Card, Typography, List, Row, Col, Statistic } from 'antd';
import { InfoCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface ResultsDisplayProps {
  results: AnalysisResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const statusBadge = (status: string, type: string) => {
    let badgeStatus: "success" | "processing" | "error" | "default" | "warning" | undefined;
    let text: string = status;

    switch (type) {
      case 'qualification':
        switch (status) {
          case 'met':
            badgeStatus = 'success';
            break;
          case 'exceeded':
            badgeStatus = 'processing';
            break;
          case 'not met':
            badgeStatus = 'error';
            break;
          default:
            badgeStatus = 'default';
        }
        break;
      case 'match_level':
      case 'alignment':
        switch (status) {
          case 'high':
            badgeStatus = 'success';
            break;
          case 'medium':
            badgeStatus = 'warning';
            break;
          case 'low':
            badgeStatus = 'default';
            break;
          case 'none':
            badgeStatus = 'error';
            break;
          default:
            badgeStatus = 'default';
        }
        break;
      case 'proficiency':
        switch (status) {
          case 'expert':
            badgeStatus = 'success';
            break;
          case 'proficient':
            badgeStatus = 'processing';
            break;
          case 'familiar':
            badgeStatus = 'warning';
            break;
          case 'not mentioned':
            badgeStatus = 'default';
            break;
          default:
            badgeStatus = 'default';
        }
        break;
    }

    return <Badge status={badgeStatus} text={text} />;
  };

  const skillsData = {
    labels: results.skills_assessment.map(skill => skill.skill),
    datasets: [
      {
        label: 'Proficiency',
        data: results.skills_assessment.map(skill => {
          switch (skill.proficiency) {
            case 'expert': return 4;
            case 'proficient': return 3;
            case 'familiar': return 2;
            case 'not mentioned': return 1;
            default: return 0;
          }
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div style={{ marginTop: 24 }}>
      <Card>
        <Title level={2}>{results.title}</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Statistic
              title="Overall Match"
              value={results.overall_match_percentage}
              suffix="%"
              valueStyle={{ color: '#3f8600' }}
            />
            <Progress percent={results.overall_match_percentage} status="active" />
          </Col>
          <Col xs={24} sm={12}>
            <Paragraph>{results.overall_assessment}</Paragraph>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="Experience Alignment">
            <Statistic
              title="Years of Relevant Experience"
              value={results.experience_alignment.years_of_relevant_experience}
              suffix="years"
            />
            <Paragraph>
              Industry Alignment: {statusBadge(results.experience_alignment.industry_alignment, 'alignment')}
            </Paragraph>
            <Paragraph>{results.experience_alignment.comments}</Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Education Match">
            <Statistic
              title="Degree Match"
              value={results.education_match.degree_match ? 'Yes' : 'No'}
              prefix={results.education_match.degree_match ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              valueStyle={{ color: results.education_match.degree_match ? '#3f8600' : '#cf1322' }}
            />
            <Paragraph>
              Field of Study Relevance: {statusBadge(results.education_match.field_of_study_relevance, 'alignment')}
            </Paragraph>
            <Paragraph>{results.education_match.comments}</Paragraph>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="Minimum Qualifications">
            <List
              dataSource={results.minimum_qualifications}
              renderItem={(qualification) => (
                <List.Item>
                  <Text>{qualification.qualification}: {statusBadge(qualification.status, 'qualification')}</Text>
                  <Tooltip title={qualification.details}>
                    <InfoCircleOutlined style={{ marginLeft: 8 }} />
                  </Tooltip>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Preferred Qualifications">
            <List
              dataSource={results.preferred_qualifications}
              renderItem={(qualification) => (
                <List.Item>
                  <Text>{qualification.qualification}: {statusBadge(qualification.status, 'qualification')}</Text>
                  <Tooltip title={qualification.details}>
                    <InfoCircleOutlined style={{ marginLeft: 8 }} />
                  </Tooltip>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Responsibilities Match">
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 3 }}
              dataSource={results.responsibilities_match}
              renderItem={(responsibility) => (
                <List.Item>
                  <Card size="small">
                    <Text>{responsibility.responsibility}: {statusBadge(responsibility.match_level, 'match_level')}</Text>
                    <Tooltip title={responsibility.relevant_experience}>
                      <InfoCircleOutlined style={{ marginLeft: 8 }} />
                    </Tooltip>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Skills Assessment">
            <div style={{ height: '300px', position: 'relative' }}>
              <Bar 
                data={skillsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={8}>
          <Card title="Cultural Fit Indicators">
            <List
              dataSource={results.cultural_fit_indicators}
              renderItem={(indicator) => (
                <List.Item>
                  <Text>{indicator}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Additional Strengths">
            <List
              dataSource={results.additional_strengths}
              renderItem={(strength) => (
                <List.Item>
                  <Text>{strength}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Areas for Growth">
            <List
              dataSource={results.areas_for_growth}
              renderItem={(growth) => (
                <List.Item>
                  <Text>{growth}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ResultsDisplay;