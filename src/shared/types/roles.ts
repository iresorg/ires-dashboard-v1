export const Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  AGENT: "AGENT",
  AGENT_ADMIN: "AGENT_ADMIN",
  RESPONDER_ADMIN: "RESPONDER_ADMIN",
  RESPONDER_TIER_1: "RESPONDER_TIER_1",
  RESPONDER_TIER_2: "RESPONDER_TIER_2",
} as const;

export type Role = typeof Role[keyof typeof Role];

// Roles that can be assigned when creating a new user (excluding SUPER_ADMIN)
// Only Super Admin can create users with these roles
export const CREATABLE_USER_ROLES = [
  Role.ADMIN,
  Role.AGENT_ADMIN,
  Role.RESPONDER_ADMIN,
  Role.AGENT,
  Role.RESPONDER_TIER_1,
  Role.RESPONDER_TIER_2,
] as const;

export type CreatableUserRole = typeof CREATABLE_USER_ROLES[number];

// Roles that Agent Admin can create (for agent page)
export const AGENT_CREATABLE_ROLES = [
  Role.AGENT,
] as const;

// Roles that Responder Admin can create (for responder page)
export const RESPONDER_CREATABLE_ROLES = [
  Role.RESPONDER_TIER_1,
  Role.RESPONDER_TIER_2,
] as const;

// Helper function to get display name for roles
export const getRoleDisplayName = (role: Role): string => {
  switch (role) {
    case Role.SUPER_ADMIN:
      return "Super Admin";
    case Role.ADMIN:
      return "Admin";
    case Role.AGENT:
      return "Agent";
    case Role.AGENT_ADMIN:
      return "Agent Admin";
    case Role.RESPONDER_ADMIN:
      return "Responder Admin";
    case Role.RESPONDER_TIER_1:
      return "Responder Tier 1";
    case Role.RESPONDER_TIER_2:
      return "Responder Tier 2";
    default:
      return role;
  }
};
