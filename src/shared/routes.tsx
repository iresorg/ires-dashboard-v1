import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";

// Layouts and Pages
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import DashboardPage from "@/features/dashboard/components/DashboardPage";
import IncidentsPage from "@/features/incidents/components/IncidentsPage";
import RespondersPage from "@/features/responders/components/RespondersPage";
import AgentsPage from "@/features/agents/components/AgentsPage";
import RegisterPage from "@/features/auth/components/RegisterPage";
import ProtectedRoute from "@/shared/components/layout/ProtectedRoute";

// 👇 Updated pages
import TabLogin from "@/features/auth/pages/TabLogin";
import LoginPage from "@/features/auth/pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/", // 👈 Default landing page now shows TabLogin
    element: <TabLogin />,
  },
  {
    path: "/login/:type", // 👈 Dynamic login route (admin, agent, responder)
    element: <LoginPage />,
  },

  {
    path: "/src/features/dashboard/components/DashboardLayout.tsx",
    element: <DashboardLayout />, // 👈 This path is not used, but included for completeness
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
        path: "incidents",
        element: <IncidentsPage />,
      },
      {
        path: "responders",
        element: <RespondersPage />,
      },
      {
        path: "agents",
        element: <AgentsPage />,
      },
    ],
  },
  {
    path: "*", // 👈 Redirect all unknown routes to the role selection page
    element: <Navigate to="/" replace />,
  },
]);
