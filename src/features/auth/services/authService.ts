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
