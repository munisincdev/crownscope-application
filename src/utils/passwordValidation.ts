export const validatePassword = (password: string) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumber,
    errors: {
      minLength: !minLength ? "Password must be at least 8 characters long" : "",
      hasUpperCase: !hasUpperCase ? "Password must contain at least one uppercase letter" : "",
      hasLowerCase: !hasLowerCase ? "Password must contain at least one lowercase letter" : "",
      hasNumber: !hasNumber ? "Password must contain at least one number" : "",
    }
  };
};