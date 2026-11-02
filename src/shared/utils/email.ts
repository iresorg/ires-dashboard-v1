const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

/** Format check after trim + lowercase. Returns an error message, or null when valid. */
export const getEmailError = (value: string): string | null => {
  const email = value.trim().toLowerCase();
  if (!email) return "Email is required";
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address";
  return null;
};

/** Staff emails are stored lowercase. Returns an error message, or null when valid. */
export const getStaffEmailError = (value: string): string | null => {
  const email = value.trim();
  if (!email) return "Email is required";
  if (email !== email.toLowerCase()) return "Email must be lowercase";
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address";
  return null;
};

export const toLowerEmail = (value: string): string => value.toLowerCase();
