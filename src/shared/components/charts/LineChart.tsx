import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LineChartProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            borderColor: string;
            backgroundColor: string;
        }[];
    };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
    return (
        <div className="h-64">
            <Line
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                        },
                    },
                }}
            />
        </div>
    );
};

export default LineChart; 