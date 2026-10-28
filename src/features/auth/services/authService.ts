import api from "@shared/services/api";
import Cookies from "js-cookie";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string | null;
  status: string;
  /** True until the staff member replaces the temporary password. */
  mustChangePassword?: boolean;
}

export interface LoginResponse {
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

export const login = async (payload: LoginPayload): Promise<User> => {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  const { user, accessToken } = response.data.data;
  Cookies.set("token", accessToken, { expires: 7 });
  return {
    ...user,
    mustChangePassword: Boolean(user.mustChangePassword),
  };
};

export const register = async (payload: RegisterPayload): Promise<User> => {
  const response = await api.post<LoginResponse>("/auth/register", payload);
  const { user, accessToken } = response.data.data;
  Cookies.set("token", accessToken, { expires: 7 }); 
  return user;
};

export interface ChangePasswordResponse {
  message: string;
  mustChangePassword: boolean;
  accessToken: string;
}

export const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<ChangePasswordResponse> => {
  const response = await api.post<
    ChangePasswordResponse & { data?: Partial<ChangePasswordResponse> }
  >("/auth/change-password", payload, { skipAuthRedirect: true });

  const body = response.data;
  const accessToken = body.accessToken || body.data?.accessToken;
  if (!accessToken) {
    throw new Error("Password changed, but no new session token was returned.");
  }

  Cookies.set("token", accessToken, { expires: 7 });
  return {
    message: body.message,
    mustChangePassword: Boolean(body.mustChangePassword ?? body.data?.mustChangePassword),
    accessToken,
  };
};

export const logout = () => {
  Cookies.remove("token");
  window.location.href = "/login";
};

export const getAuthErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "object" && error && "response" in error) {
    const message = (error as { response?: { data?: { message?: string } } }).response?.data
      ?.message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return fallback;
};

export const forgotPassword = async (email: string): Promise<string> => {
  const response = await api.post<{ message?: string }>(
    "/auth/forgot-password",
    { email },
    { skipAuthRedirect: true }
  );
  return (
    response.data?.message ||
    "If the email exists, a password reset link has been sent."
  );
};

export const resetPassword = async (payload: {
  email: string;
  token: string;
  newPassword: string;
}): Promise<string> => {
  const response = await api.post<{ message?: string }>(
    "/auth/reset-password",
    payload,
    { skipAuthRedirect: true }
  );
  Cookies.remove("token");
  return response.data?.message || "Password updated. Sign in with your new password.";
};
