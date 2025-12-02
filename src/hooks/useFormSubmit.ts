// Custom hook for form submission
import { useState } from 'react';
import { submitFormToGoogleScript } from '@utils/api';
import type { FormSubmissionData, ApiResponse, RegistrationResponse } from '@types';

interface UseFormSubmitOptions {
  onSuccess?: (data: RegistrationResponse) => void;
  onError?: (error: string) => void;
}

export const useFormSubmit = (options: UseFormSubmitOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const submit = async (formData: FormSubmissionData): Promise<ApiResponse<RegistrationResponse>> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await submitFormToGoogleScript(formData);

      if (response.success && response.data) {
        setIsSuccess(true);
        options.onSuccess?.(response.data);
        return response;
      } else {
        const errorMessage = response.error || 'Failed to submit form';
        setError(errorMessage);
        options.onError?.(errorMessage);
        return response;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
  };

  return {
    submit,
    isLoading,
    error,
    isSuccess,
    reset,
  };
};

export default useFormSubmit;
