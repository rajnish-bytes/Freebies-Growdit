// API Utilities

import type { ApiResponse, FormSubmissionData, RegistrationResponse } from '@types';

/**
 * Submit form data to Google Apps Script
 */
export const submitFormToGoogleScript = async (
  formData: FormSubmissionData
): Promise<ApiResponse<RegistrationResponse>> => {
  try {
    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      throw new Error('Google Script URL is not configured');
    }

    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
      }),
    });

    // Note: With no-cors mode, we can't read the response
    // So we assume success if no error was thrown
    return {
      success: true,
      data: {
        message: 'Registration submitted successfully!',
      },
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit form',
    };
  }
};

/**
 * Generic fetch wrapper with error handling
 */
export const fetchApi = async <T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('API fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch data',
    };
  }
};
