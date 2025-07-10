import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";

// Layouts and Pages
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import DashboardPage from "@/features/dashboard/components/DashboardPage";
import IncidentsPage from "@/features/incidents/components/IncidentsPage";
import RespondersPage from "@/features/responders/components/RespondersPage";
import AgentsPage from "@/features/agents/components/AgentsPage";
import AgentTokenPage from "@/features/agents/components/AgentTokenPage"; // 
import UsersPage from "@/features/users/components/UsersPage";
import TicketsPage from "@/features/tickets/components/TicketsPage";
import SettingsPage from "@/features/settings/components/SettingsPage";
import RegisterPage from "@/features/auth/components/RegisterPage";
import ProtectedRoute from "@/shared/components/layout/ProtectedRoute";


// Auth pages
import TabLogin from "@/features/auth/pages/TabLogin";
import LoginPage from "@/features/auth/pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: ROUTES.SELECT_LOGIN,
    element: <TabLogin />,
  },
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
      {
        path: "agents/:agentId/tokens", 
        element: <AgentTokenPage />, 
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "tickets",
        element: <TicketsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.SELECT_LOGIN} replace />,
  },
]);
