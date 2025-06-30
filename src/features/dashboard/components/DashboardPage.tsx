import React from 'react';
import DashboardStats from './DashboardStats';
// import { Link } from 'react-router-dom';
// import { ROUTES } from '@/shared/constants/routes';
// import Button from '@/shared/components/ui/Button';
// import LineChart from '@/shared/components/charts/LineChart';


const DashboardPage: React.FC = () => {
  // const recentActivityData = {
  //   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   datasets: [
  //     {
  //       label: 'Incidents',
  //       data: [12, 19, 15, 25, 22, 30, 28],
  //       borderColor: 'rgb(59, 130, 246)',
  //       backgroundColor: 'rgba(59, 130, 246, 0.5)',
  //     },
  //   ],
  // };

  return (
    <div className="space-y-6">
      <DashboardStats />
    </div>
  );
};

export default DashboardPage;