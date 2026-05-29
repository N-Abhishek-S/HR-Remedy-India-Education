import type { User } from "@supabase/supabase-js";

export const adminRoles = [
  "super_admin",
  "admin",
  "marketing_admin",
  "content_manager",
  "counsellor",
  "sales",
] as const;

export type AdminRole = (typeof adminRoles)[number];

const adminRoleSet = new Set<string>(adminRoles);

export function getUserRoleNames(user: User | null) {
  if (!user) {
    return [];
  }

  const metadata = user.app_metadata as { role?: unknown; roles?: unknown };
  const role = metadata.role;
  const roles = metadata.roles;
  const roleNames = new Set<string>();

  if (typeof role === "string") {
    roleNames.add(role);
  }

  if (Array.isArray(roles)) {
    roles.forEach((entry) => {
      if (typeof entry === "string") {
        roleNames.add(entry);
      }
    });
  }

  return Array.from(roleNames);
}

export function hasRole(user: User | null, allowedRoles: readonly AdminRole[]) {
  const userRoles = getUserRoleNames(user);

  return userRoles.some((role) => allowedRoles.includes(role as AdminRole));
}

export function hasAdminAccess(user: User | null) {
  return getUserRoleNames(user).some((role) => adminRoleSet.has(role));
}
