/**
 * Generate initials from user's first and last name
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Initials string (e.g., "JD" for "John Doe")
 */
export const getUserInitials = (firstName?: string, lastName?: string): string => {
  if (!firstName && !lastName) return "?";
  
  const firstInitial = firstName?.charAt(0).toUpperCase() || "";
  const lastInitial = lastName?.charAt(0).toUpperCase() || "";
  
  return firstInitial + lastInitial;
};

/**
 * Generate a consistent color for user initials based on their name
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Tailwind CSS color class
 */
export const getUserInitialsColor = (firstName?: string, lastName?: string): string => {
  const name = `${firstName || ""}${lastName || ""}`.toLowerCase();
  const colors = [
    "bg-blue-500",
    "bg-green-500", 
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500"
  ];
  
  // Simple hash function to get consistent color for same name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
