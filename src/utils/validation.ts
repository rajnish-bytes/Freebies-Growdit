// Form Validation Utilities

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Accepts various phone formats: +1234567890, (123) 456-7890, 123-456-7890, etc.
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length >= 10;
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

// Validation error messages
export const getValidationError = (field: string, type: string): string => {
  const errors: Record<string, Record<string, string>> = {
    email: {
      required: 'Email is required',
      invalid: 'Please enter a valid email address',
    },
    phone: {
      required: 'Phone number is required',
      invalid: 'Please enter a valid phone number',
    },
    fullName: {
      required: 'Full name is required',
      minLength: 'Name must be at least 2 characters',
    },
    firmName: {
      required: 'Firm name is required',
    },
  };

  return errors[field]?.[type] || 'Invalid input';
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .substring(0, 500); // Limit length
};
