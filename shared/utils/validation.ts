/**
 * Email validation utility
 * Validates email format using the same pattern as backend @Email annotation
 */
export function isValidEmail(email: string): boolean {
  // Simple email regex matching common formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Password validation
 * Backend requires min 8 characters
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * Nickname validation
 * Backend requires max 30 characters
 */
export function isValidNickname(nickname: string): boolean {
  return nickname.length > 0 && nickname.length <= 30;
}
