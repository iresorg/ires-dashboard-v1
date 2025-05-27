import React from 'react';
import LineChart from '@/components/charts/LineChart';

const AnalyticsPage: React.FC = () => {
    const incidentData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Active Incidents',
                data: [12, 19, 15, 25, 22, 30],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
            },
            {
                label: 'Resolved Incidents',
                data: [8, 15, 12, 18, 20, 25],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
            },
        ],
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-sm font-medium text-gray-500">Total Incidents</h3>
                    <p className="mt-2 text-3xl font-semibold">1,234</p>
                    <p className="mt-2 text-sm text-green-600">↑ 12% from last month</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-sm font-medium text-gray-500">Active Responders</h3>
                    <p className="mt-2 text-3xl font-semibold">45</p>
                    <p className="mt-2 text-sm text-green-600">↑ 8% from last month</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-sm font-medium text-gray-500">Average Response Time</h3>
                    <p className="mt-2 text-3xl font-semibold">8.5 min</p>
                    <p className="mt-2 text-sm text-red-600">↑ 2% from last month</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-sm font-medium text-gray-500">Resolution Rate</h3>
                    <p className="mt-2 text-3xl font-semibold">92%</p>
                    <p className="mt-2 text-sm text-green-600">↑ 5% from last month</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium mb-4">Incident Trends</h3>
                    <LineChart data={incidentData} />
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium mb-4">Response Time Distribution</h3>
                    <LineChart
                        data={{
                            labels: ['0-5min', '5-10min', '10-15min', '15-20min', '20+min'],
                            datasets: [
                                {
                                    label: 'Response Time',
                                    data: [30, 45, 15, 7, 3],
                                    borderColor: 'rgb(245, 158, 11)',
                                    backgroundColor: 'rgba(245, 158, 11, 0.5)',
                                },
                            ],
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage; 