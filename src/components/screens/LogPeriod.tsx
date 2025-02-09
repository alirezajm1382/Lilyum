import { Form, DatePicker, Checkbox, Button, Card, Typography, message, List, Tag, Space } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface PeriodLog {
  dateRange: [string, string];
  symptoms: string[];
}

const symptoms = [
  { label: 'Cramps', value: 'cramps' },
  { label: 'Headache', value: 'headache' },
  { label: 'Mood Swings', value: 'mood_swings' },
  { label: 'Fatigue', value: 'fatigue' },
  { label: 'Bloating', value: 'bloating' },
  { label: 'Breast Tenderness', value: 'breast_tenderness' },
];

const LogPeriod = () => {
  const [form] = Form.useForm();
  const [logs, setLogs] = useState<PeriodLog[]>([]);

  useEffect(() => {
    // Get existing logs
    const existingLogs = JSON.parse(localStorage.getItem('periodLogs') || '[]');
    setLogs(existingLogs);
  }, []);

  const onFinish = (values: any) => {
    const periodLog: PeriodLog = {
      dateRange: [
        values.dateRange[0].format('YYYY-MM-DD'),
        values.dateRange[1].format('YYYY-MM-DD'),
      ],
      symptoms: values.symptoms || [],
    };

    // Get existing logs or initialize empty array
    const existingLogs = JSON.parse(localStorage.getItem('periodLogs') || '[]');
    
    // Add and save
    existingLogs.push(periodLog);
    localStorage.setItem('periodLogs', JSON.stringify(existingLogs));
    
    // Update last period date
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.lastPeriod = periodLog.dateRange[0];
    localStorage.setItem('userData', JSON.stringify(userData));

    // Update local state
    setLogs(existingLogs);

    message.success('Period logged successfully');
    form.resetFields();
  };

  const getSymptomLabel = (value: string) => {
    const symptom = symptoms.find(s => s.value === value);
    return symptom ? symptom.label : value;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
      <Card>
        <Title level={3} style={{ textAlign: 'center', color: '#ff69b4', marginBottom: '24px' }}>
          <CalendarOutlined /> Log Period
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="When did your period start and end?"
            name="dateRange"
            rules={[{ required: true, message: 'Please select the date range' }]}
          >
            <RangePicker 
              style={{ width: '100%' }}
              disabledDate={(current) => current && current > dayjs().endOf('day')}
            />
          </Form.Item>

          <Form.Item
            label="What symptoms did you experience?"
            name="symptoms"
          >
            <Checkbox.Group 
              options={symptoms}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Save Period Log
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card>
        <Title level={4} style={{ color: '#ff69b4', marginBottom: '16px' }}>
          Period History
        </Title>
        <List
          dataSource={[...logs].reverse()}
          renderItem={(log: PeriodLog) => (
            <List.Item>
              <List.Item.Meta
                avatar={<ClockCircleOutlined style={{ fontSize: '24px', color: '#ff69b4' }} />}
                title={
                  <Text strong>
                    {dayjs(log.dateRange[0]).format('MMMM D')} - {dayjs(log.dateRange[1]).format('MMMM D, YYYY')} ({dayjs(log.dateRange[1]).diff(dayjs(log.dateRange[0]), 'days')} days)
                  </Text>
                }
                description={
                  <Space size={[0, 8]} wrap>
                    {log.symptoms.map((symptom) => (
                      <Tag key={symptom} color="pink">
                        {getSymptomLabel(symptom)}
                      </Tag>
                    ))}
                  </Space>
                }
              />
            </List.Item>
          )}
          locale={{
            emptyText: <Text type="secondary">No period logs yet</Text>
          }}
        />
      </Card>
    </div>
  );
};

export default LogPeriod; 