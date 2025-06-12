import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import DashboardPage from "@/features/dashboard/components/DashboardPage";
import IncidentsPage from "@/features/incidents/components/IncidentsPage";
import RespondersPage from "@/features/responders/components/RespondersPage";
import AgentsPage from "@/features/agents/components/AgentsPage";
import RegisterPage from "@/features/auth/components/RegisterPage";
import ProtectedRoute from "@/shared/components/layout/ProtectedRoute";

// ✅ Updated imports
import TabLogin from "@/features/auth/pages/TabLogin";
import LoginPage from "@/features/auth/pages/LoginPage"; // Page with layout and dynamic form

export const router = createBrowserRouter([
  {
    path: "/select-login",
    element: <TabLogin />,
  },
  {
    path: "/login/:type", // Dynamic route for admin/agent/responder
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
    path: "*",
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
]);
