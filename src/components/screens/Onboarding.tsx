import dayjs from "dayjs";

// Ant Design
import { Form, DatePicker, InputNumber, Button, Card, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        lastPeriod: values.lastPeriod.format("YYYY-MM-DD"),
        cycleLength: values.cycleLength,
        isOnboarded: true,
      })
    );
    onComplete();
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Card>
        <Title level={2} style={{ textAlign: "center", color: "#ff69b4" }}>
          <CalendarOutlined /> Lilyum
        </Title>
        <Text
          style={{
            fontSize: "16px",
            display: "block",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          Let's get started with tracking your cycle
        </Text>

        <Form
          form={form}
          layout="vertical"
          variant="filled"
          onFinish={onFinish}
          initialValues={{
            cycleLength: 28,
          }}
        >
          <Form.Item
            label="When was your last period?"
            style={{ fontSize: "20px" }}
            name="lastPeriod"
            rules={[
              {
                required: true,
                message: "Please select your last period date",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            label="What's your average cycle length? (in days)"
            name="cycleLength"
            extra="This is the average length of your menstrual cycle. It's usually between 21 and 35 days."
            rules={[
              { required: true, message: "Please enter your cycle length" },
            ]}
          >
            <InputNumber min={21} max={35} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Get Started
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Onboarding;
