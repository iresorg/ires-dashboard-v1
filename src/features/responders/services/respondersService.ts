import {
  activateUser,
  createUser,
  deleteUser,
  deactivateUser,
  getUserById,
  getUsers,
  updateUser,
  type UserProfile,
} from "@/features/users/services/userService";

export type ResponderRole = "RESPONDER_TIER_1" | "RESPONDER_TIER_2";

export interface ResponderProfile extends Omit<UserProfile, "role" | "status"> {
  role: ResponderRole;
  status: "active" | "inactive";
  avatar?: {
    url: string;
    publicId?: string;
  } | null;
}

export type RespondersResponse = {
  data: ResponderProfile[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
};

export interface CreateResponderData {
  firstName: string;
  lastName: string;
  email: string;
  role: ResponderRole;
  avatar?: File;
}

export interface UpdateResponderData {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: ResponderRole;
  avatarFile?: File | null;
}

const toResponder = (user: UserProfile): ResponderProfile => ({
  ...user,
  role: user.role as ResponderRole,
  status: user.status === "inactive" ? "inactive" : "active",
  avatar:
    user.avatar && typeof user.avatar === "object"
      ? { url: user.avatar.url, publicId: user.avatar.publicId }
      : typeof user.avatar === "string"
        ? { url: user.avatar }
        : null,
});

export const getResponders = async (
  page = 1,
  limit = 10,
  search?: string,
  role?: ResponderRole
): Promise<RespondersResponse> => {
  if (role) {
    const response = await getUsers({ page, limit, search, role });
    return {
      ...response,
      data: response.data.map(toResponder),
    };
  }

  const [tier1, tier2] = await Promise.all([
    getUsers({ page: 1, limit: 100, search, role: "RESPONDER_TIER_1" }),
    getUsers({ page: 1, limit: 100, search, role: "RESPONDER_TIER_2" }),
  ]);

  const merged = [...tier1.data, ...tier2.data]
    .map(toResponder)
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  const start = (page - 1) * limit;
  const data = merged.slice(start, start + limit);
  const total = merged.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    data,
    total,
    limit,
    page,
    totalPages,
    nextPage: page < totalPages ? page + 1 : null,
  };
};

export const getResponderById = async (id: string): Promise<ResponderProfile> => {
  return toResponder(await getUserById(id));
};

export const createResponder = async (
  data: CreateResponderData
): Promise<{ message: string }> => {
  return createUser({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role,
    avatarFile: data.avatar,
  });
};

export const updateResponder = async (
  id: string,
  data: UpdateResponderData
): Promise<ResponderProfile> => {
  const response = await updateUser(id, {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role,
    avatarFile: data.avatarFile,
  });
  return toResponder(response.data);
};

export const activateResponder = async (id: string): Promise<void> => {
  await activateUser(id);
};

export const deactivateResponder = async (id: string): Promise<void> => {
  await deactivateUser(id);
};

export const deleteResponder = async (id: string): Promise<void> => {
  await deleteUser(id);
};
