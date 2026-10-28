import React from "react";
import { ThemeProvider } from "@shared/ThemeContext";
import LoginForm from "@features/auth/components/LoginForm";
import AuthSplitLayout from "../components/AuthSplitLayout";

const LoginPage: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthSplitLayout>
        <LoginForm />
      </AuthSplitLayout>
    </ThemeProvider>
  );
};

export default LoginPage;
