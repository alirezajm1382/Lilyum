import { useState, useEffect } from 'react';
import { Card, Typography, Switch, Form, InputNumber, Button, Divider, message } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface SettingsData {
  notifications: boolean;
  reminderDays: number;
  cycleLength: number;
}

const Settings = () => {
  const [form] = Form.useForm();
  const [settings, setSettings] = useState<SettingsData>({
    notifications: false,
    reminderDays: 2,
    cycleLength: 28,
  });

  useEffect(() => {
    // Load settings from localStorage
    const storedSettings = localStorage.getItem('settings');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
    
    form.setFieldsValue({
      ...JSON.parse(storedSettings || '{}'),
      cycleLength: userData.cycleLength || 28,
    });
  }, [form]);

  const handleSettingsChange = (values: SettingsData) => {
    // Save settings to localStorage
    localStorage.setItem('settings', JSON.stringify(values));
    
    // Update cycle length in userData
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.cycleLength = values.cycleLength;
    localStorage.setItem('userData', JSON.stringify(userData));
    
    message.success('Settings saved successfully');
  };

  return (
    <Card>
      <Title level={3} style={{ textAlign: 'center', color: '#ff69b4', marginBottom: '24px' }}>
        Settings
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSettingsChange}
        initialValues={settings}
      >
        {/* TODO: Notifications */}
        <Title level={4}>
          <BellOutlined /> Notifications
        </Title>
        
        <Form.Item
          name="notifications"
          valuePropName="checked"
        >
          <Switch 
            checkedChildren="On" 
            unCheckedChildren="Off"
          />
        </Form.Item>

        <Form.Item
          label="Remind me before my period (days)"
          name="reminderDays"
        >
          <InputNumber
            min={1}
            max={7}
            style={{ width: '100%' }}
            disabled={!form.getFieldValue('notifications')}
          />
        </Form.Item>

        <Divider />

        <Title level={4}>
          <UserOutlined /> Cycle Settings
        </Title>

        <Form.Item
          label="Average cycle length (days)"
          name="cycleLength"
          rules={[{ required: true, message: 'Please enter your cycle length' }]}
        >
          <InputNumber
            min={21}
            max={35}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit"
            style={{ width: '100%' }}
          >
            Save Settings
          </Button>
        </Form.Item>
      </Form>

      <Divider />

      <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
        Lilyum v1.0.0
      </Text>
    </Card>
  );
};

export default Settings; 