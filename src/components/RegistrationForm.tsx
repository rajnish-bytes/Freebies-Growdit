import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  fullName: string;
  firmName: string;
  email: string;
  whatsapp: string;
  websiteOrLinkedIn: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  firmName?: string;
  email?: string;
  whatsapp?: string;
  websiteOrLinkedIn?: string;
  consent?: string;
}

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationForm({ isOpen, onClose }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    firmName: '',
    email: '',
    whatsapp: '',
    websiteOrLinkedIn: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [countryCode, setCountryCode] = useState('+1');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset form after closing animation
      setTimeout(() => {
        setFormData({
          fullName: '',
          firmName: '',
          email: '',
          whatsapp: '',
          websiteOrLinkedIn: '',
          consent: false,
        });
        setErrors({});
        setIsSuccess(false);
        setSubmitError('');
        setCountryCode('+1');
      }, 300);
    }
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateURL = (url: string): boolean => {
    try {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      return urlPattern.test(url) || url.includes('linkedin.com');
    } catch {
      return false;
    }
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (!validateName(formData.fullName)) {
      newErrors.fullName = 'Please enter a valid name (letters only, min 2 characters)';
    }

    // Firm Name validation
    if (!formData.firmName.trim()) {
      newErrors.firmName = 'Firm name is required';
    } else if (formData.firmName.trim().length < 2) {
      newErrors.firmName = 'Firm name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // WhatsApp validation
    const phoneNumber = formData.whatsapp.replace(/\D/g, '');
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!validatePhone(phoneNumber)) {
      newErrors.whatsapp = 'Please enter a valid phone number (10-15 digits)';
    }

    // Website/LinkedIn validation
    if (!formData.websiteOrLinkedIn.trim()) {
      newErrors.websiteOrLinkedIn = 'Website or LinkedIn URL is required';
    } else if (!validateURL(formData.websiteOrLinkedIn)) {
      newErrors.websiteOrLinkedIn = 'Please enter a valid URL';
    }

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Get Google Apps Script URL from environment variable
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      
      if (!scriptUrl) {
        throw new Error('Google Script URL not configured. Please add VITE_GOOGLE_SCRIPT_URL to your .env.local file.');
      }

      // Prepare data for Google Sheets
      const fullWhatsApp = `${countryCode}${formData.whatsapp}`;
      const submissionData = {
        ...formData,
        whatsapp: fullWhatsApp,
        timestamp: new Date().toISOString(),
      };

      // Submit to Google Apps Script
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requires no-cors mode
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      // Note: With no-cors mode, we can't read the response
      // So we assume success if no error is thrown
      // For better UX, you can enable CORS in the Apps Script or use a different approach
      
      // Alternative: If you configure CORS properly in Apps Script, use this instead:
      // const result = await response.json();
      // if (!result.success) {
      //   if (result.duplicate) {
      //     setSubmitError(result.message || 'This email or name is already registered.');
      //     setIsSubmitting(false);
      //     return;
      //   }
      //   throw new Error(result.message || 'Submission failed');
      // }

      // Success - since we're using no-cors, we assume success
      setIsSuccess(true);
      
      // Don't reset form immediately, keep it for user to see
      // Auto-close modal after 5 seconds on success
      setTimeout(() => {
        handleClose();
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Failed to submit registration. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            transition={{ duration: 0.3 }}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-7xl max-h-[90vh] overflow-hidden bg-white rounded-3xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors group disabled:opacity-50"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
              {/* Success View */}
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    className="p-8 md:p-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Success Animation */}
                    <motion.div
                      className="mb-6 inline-flex"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <div className="relative">
                        <motion.div
                          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center"
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(34, 197, 94, 0.4)",
                              "0 0 0 20px rgba(34, 197, 94, 0)",
                            ],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                          }}
                        >
                          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <motion.path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                            />
                          </svg>
                        </motion.div>
                        
                        {/* Confetti particles */}
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                            style={{
                              top: '50%',
                              left: '50%',
                            }}
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{
                              scale: [0, 1, 0],
                              x: Math.cos((i * Math.PI * 2) / 8) * 60,
                              y: Math.sin((i * Math.PI * 2) / 8) * 60,
                            }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    <motion.h2
                      className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      🎉 Registration Successful!
                    </motion.h2>

                    <motion.p
                      className="text-lg text-gray-600 mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Thanks, <strong>{formData.fullName}</strong>!
                      <br />
                      We've sent a confirmation email to <strong>{formData.email}</strong>
                    </motion.p>

                    <motion.div
                      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="font-semibold text-gray-900 mb-3">📋 What's Next?</h3>
                      <ul className="text-left text-gray-700 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>Check your email for confirmation and next steps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>We'll contact you on WhatsApp within 24 hours</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>Prepare to receive 5 Reels + 2 Carousels for free!</span>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.button
                      onClick={handleClose}
                      className="px-8 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Done
                    </motion.button>

                    <motion.p
                      className="text-sm text-gray-500 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      This popup will close automatically in a few seconds...
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    className="p-8 md:p-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Header */}
                    <div className="text-center mb-8">
                      <motion.div
                        className="inline-flex items-center mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <span className="badge bg-primary-100 text-primary-700 border border-primary-200 px-5 py-2">
                          <span className="mr-2">🎁</span>
                          Free Content Week
                        </span>
                      </motion.div>

                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Register for Your
                        <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 via-purple-600 to-pink-600">
                          Free Week
                        </span>
                      </h2>

                      <p className="text-gray-600">
                        Fill out the form below and we'll send you a confirmation email with next steps.
                      </p>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {submitError && (
                        <motion.div
                          className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl"
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        >
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="text-red-800 font-medium text-sm">{submitError}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
                            errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="John Doe"
                        />
                        <AnimatePresence>
                          {errors.fullName && (
                            <motion.p
                              className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.fullName}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Firm Name */}
                      <div>
                        <label htmlFor="firmName" className="block text-sm font-semibold text-gray-700 mb-2">
                          Firm Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="firmName"
                          name="firmName"
                          value={formData.firmName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
                            errors.firmName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Your Company Name"
                        />
                        <AnimatePresence>
                          {errors.firmName && (
                            <motion.p
                              className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.firmName}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Work Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Work Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
                            errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="john@company.com"
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* WhatsApp Number */}
                      <div>
                        <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-2">
                          WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white hover:border-gray-300 transition-all text-sm"
                          >
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+86">🇨🇳 +86</option>
                            <option value="+81">🇯🇵 +81</option>
                            <option value="+49">🇩🇪 +49</option>
                            <option value="+33">🇫🇷 +33</option>
                            <option value="+39">🇮🇹 +39</option>
                            <option value="+34">🇪🇸 +34</option>
                            <option value="+61">🇦🇺 +61</option>
                            <option value="+55">🇧🇷 +55</option>
                            <option value="+52">🇲🇽 +52</option>
                            <option value="+971">🇦🇪 +971</option>
                            <option value="+65">🇸🇬 +65</option>
                          </select>
                          <input
                            type="tel"
                            id="whatsapp"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            className={`flex-1 px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
                              errors.whatsapp ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            placeholder="1234567890"
                          />
                        </div>
                        <AnimatePresence>
                          {errors.whatsapp && (
                            <motion.p
                              className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.whatsapp}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Website or LinkedIn */}
                      <div>
                        <label htmlFor="websiteOrLinkedIn" className="block text-sm font-semibold text-gray-700 mb-2">
                          Website or LinkedIn URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          id="websiteOrLinkedIn"
                          name="websiteOrLinkedIn"
                          value={formData.websiteOrLinkedIn}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
                            errors.websiteOrLinkedIn ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="https://yourwebsite.com"
                        />
                        <AnimatePresence>
                          {errors.websiteOrLinkedIn && (
                            <motion.p
                              className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.websiteOrLinkedIn}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Consent Checkbox */}
                      <div>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative shrink-0 mt-0.5">
                            <input
                              type="checkbox"
                              name="consent"
                              checked={formData.consent}
                              onChange={handleChange}
                              className="peer sr-only"
                            />
                            <div className={`w-5 h-5 border-2 rounded-md transition-all ${
                              errors.consent 
                                ? 'border-red-300 bg-red-50' 
                                : 'border-gray-300 group-hover:border-primary-500'
                            } peer-checked:bg-primary-600 peer-checked:border-primary-600`}>
                              <svg
                                className="w-full h-full text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-xs text-gray-600 leading-relaxed">
                            I agree that my contact information will be used solely for registration purposes. 
                            No promotional or spam emails. <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <AnimatePresence>
                          {errors.consent && (
                            <motion.p
                              className="mt-1.5 text-xs text-red-600 flex items-center gap-1 ml-8"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.consent}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3.5 px-8 text-base font-bold text-white rounded-xl transition-all duration-300 relative overflow-hidden group mt-6 ${
                          isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-linear-to-r from-primary-600 to-purple-600 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02]'
                        }`}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </>
                          ) : (
                            <>
                              Start My Free Week
                              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </>
                          )}
                        </span>

                        {!isSubmitting && (
                          <motion.div
                            className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                      </motion.button>

                      {/* Trust Indicators */}
                      <div className="flex items-center justify-center gap-4 flex-wrap text-xs text-gray-500 pt-2">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Secure</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          <span>No Spam</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>Instant Confirmation</span>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
