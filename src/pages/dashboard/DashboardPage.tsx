import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/ui/Button';
import LineChart from '@/components/charts/LineChart';

const DashboardPage: React.FC = () => {
  const recentActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Incidents',
        data: [12, 19, 15, 25, 22, 30, 28],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Incidents</h3>
          <p className="mt-2 text-3xl font-semibold">12</p>
          <p className="mt-2 text-sm text-green-600">↑ 2 from yesterday</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Available Responders</h3>
          <p className="mt-2 text-3xl font-semibold">24</p>
          <p className="mt-2 text-sm text-green-600">↑ 5 from yesterday</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Response Time</h3>
          <p className="mt-2 text-3xl font-semibold">8.5 min</p>
          <p className="mt-2 text-sm text-red-600">↑ 1.2 min from yesterday</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Resolution Rate</h3>
          <p className="mt-2 text-3xl font-semibold">92%</p>
          <p className="mt-2 text-sm text-green-600">↑ 3% from yesterday</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to={ROUTES.INCIDENTS}>
            <Button className="w-full">New Incident</Button>
          </Link>
          <Link to={ROUTES.RESPONDERS}>
            <Button className="w-full">Add Responder</Button>
          </Link>
          <Link to={ROUTES.ANALYTICS}>
            <Button className="w-full">View Reports</Button>
          </Link>
          <Link to={ROUTES.SETTINGS}>
            <Button className="w-full">Settings</Button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Recent Activity</h2>
        </div>
        <div className="p-6">
          <LineChart data={recentActivityData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;