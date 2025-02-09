import { useEffect, useState } from 'react';
import { Calendar, Card, Typography, Badge } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface UserData {
  lastPeriod: string;
  cycleLength: number;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [nextPeriod, setNextPeriod] = useState<Dayjs | null>(null);
  const [daysUntilNext, setDaysUntilNext] = useState<number>(0);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setUserData(parsed);
      
      const lastPeriodDate = dayjs(parsed.lastPeriod);
      const nextPeriodDate = lastPeriodDate.add(parsed.cycleLength, 'day');
      setNextPeriod(nextPeriodDate);
      
      const today = dayjs();
      const daysUntil = nextPeriodDate.diff(today, 'day');
      setDaysUntilNext(daysUntil);
    }
  }, []);

  const dateCellRender = (value: Dayjs) => {
    if (!userData || !nextPeriod) return null;

    const lastPeriodDate = dayjs(userData.lastPeriod);
    const isPeriodDay = value.isSame(lastPeriodDate, 'day') || 
      (value.isAfter(lastPeriodDate) && 
       value.diff(lastPeriodDate, 'day') % userData.cycleLength === 0);

    if (isPeriodDay) {
      return <Badge color="#ff69b4" text="Period" />;
    }
    return null;
  };

  return (
    <div>
      <Card style={{ marginBottom: '20px' }}>
        <Title level={4} style={{ margin: 0, color: '#ff69b4' }}>Cycle Status</Title>
        {nextPeriod && (
          <Text>
            {daysUntilNext > 0
              ? `Next period in ${daysUntilNext} days`
              : daysUntilNext === 0
              ? "Your period is expected today"
              : `Period was expected ${Math.abs(daysUntilNext)} days ago`}
          </Text>
        )}
      </Card>

      <Card>
        <Calendar
          fullscreen={false}
          cellRender={dateCellRender}
        />
      </Card>
    </div>
  );
};

export default Dashboard; 