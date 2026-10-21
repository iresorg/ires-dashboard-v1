/** Staff emails are stored lowercase. Returns an error message, or null when valid. */
export const getStaffEmailError = (value: string): string | null => {
  const email = value.trim();
  if (!email) return "Email is required";
  if (email !== email.toLowerCase()) return "Email must be lowercase";
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
    return "Enter a valid email address";
  }
  return null;
};

export const toLowerEmail = (value: string): string => value.toLowerCase();
