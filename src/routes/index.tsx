import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import IncidentsPage from '@/pages/dashboard/incidents/IncidentsPage';
import RespondersPage from '@/pages/dashboard/responders/RespondersPage';
import AnalyticsPage from '@/pages/dashboard/analytics/AnalyticsPage';
import SettingsPage from '@/pages/dashboard/settings/SettingsPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ProtectedRoute from '@/components/ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
    },
    {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
    },
    {
        path: ROUTES.DASHBOARD,
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: 'incidents',
                element: <IncidentsPage />,
            },
            {
                path: 'responders',
                element: <RespondersPage />,
            },
            {
                path: 'analytics',
                element: <AnalyticsPage />,
            },
            {
                path: 'settings',
                element: <SettingsPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
    },
]); 