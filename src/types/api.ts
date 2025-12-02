// API Types

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface RegistrationResponse {
  message: string;
  row?: number;
  timestamp?: string;
}

export interface GoogleScriptResponse {
  result: 'success' | 'error';
  message: string;
  data?: Record<string, unknown>;
}

export interface FormSubmissionData {
  fullName: string;
  firmName: string;
  email: string;
  phone: string;
  interests?: string[];
  message?: string;
  timestamp?: string;
}
