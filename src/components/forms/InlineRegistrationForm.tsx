import { useState } from 'react';
import FlagIcon from '../common/FlagIcon';

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

export default function InlineRegistrationForm() {
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
  const [submitError, setSubmitError] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedFormData, setSavedFormData] = useState<FormData | null>(null);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Country data with ISO codes for flags and emoji flags for options
  const countries = [
    { code: '+1', name: 'US', iso: 'us', flag: '🇺🇸' },
    { code: '+44', name: 'UK', iso: 'gb', flag: '🇬🇧' },
    { code: '+91', name: 'India', iso: 'in', flag: '🇮🇳' },
    { code: '+61', name: 'Australia', iso: 'au', flag: '🇦🇺' },
    { code: '+971', name: 'UAE', iso: 'ae', flag: '🇦🇪' },
    { code: '+81', name: 'Japan', iso: 'jp', flag: '🇯🇵' },
    { code: '+86', name: 'China', iso: 'cn', flag: '🇨🇳' },
    { code: '+49', name: 'Germany', iso: 'de', flag: '🇩🇪' },
    { code: '+33', name: 'France', iso: 'fr', flag: '🇫🇷' },
    { code: '+39', name: 'Italy', iso: 'it', flag: '🇮🇹' },
    { code: '+34', name: 'Spain', iso: 'es', flag: '🇪🇸' },
    { code: '+7', name: 'Russia', iso: 'ru', flag: '🇷🇺' },
    { code: '+55', name: 'Brazil', iso: 'br', flag: '🇧🇷' },
    { code: '+52', name: 'Mexico', iso: 'mx', flag: '🇲🇽' },
    { code: '+27', name: 'South Africa', iso: 'za', flag: '🇿🇦' },
    { code: '+82', name: 'South Korea', iso: 'kr', flag: '🇰🇷' },
    { code: '+65', name: 'Singapore', iso: 'sg', flag: '🇸🇬' },
    { code: '+60', name: 'Malaysia', iso: 'my', flag: '🇲🇾' },
    { code: '+63', name: 'Philippines', iso: 'ph', flag: '🇵🇭' },
    { code: '+66', name: 'Thailand', iso: 'th', flag: '🇹🇭' },
    { code: '+62', name: 'Indonesia', iso: 'id', flag: '🇮🇩' },
    { code: '+92', name: 'Pakistan', iso: 'pk', flag: '🇵🇰' },
    { code: '+880', name: 'Bangladesh', iso: 'bd', flag: '🇧🇩' },
    { code: '+94', name: 'Sri Lanka', iso: 'lk', flag: '🇱🇰' },
    { code: '+977', name: 'Nepal', iso: 'np', flag: '🇳🇵' },
    { code: '+64', name: 'New Zealand', iso: 'nz', flag: '🇳🇿' },
    { code: '+353', name: 'Ireland', iso: 'ie', flag: '🇮🇪' },
    { code: '+31', name: 'Netherlands', iso: 'nl', flag: '🇳🇱' },
    { code: '+46', name: 'Sweden', iso: 'se', flag: '🇸🇪' },
    { code: '+47', name: 'Norway', iso: 'no', flag: '🇳🇴' },
    { code: '+41', name: 'Switzerland', iso: 'ch', flag: '🇨🇭' },
    { code: '+32', name: 'Belgium', iso: 'be', flag: '🇧🇪' },
    { code: '+351', name: 'Portugal', iso: 'pt', flag: '🇵🇹' },
    { code: '+20', name: 'Egypt', iso: 'eg', flag: '🇪🇬' },
    { code: '+234', name: 'Nigeria', iso: 'ng', flag: '🇳🇬' },
    { code: '+254', name: 'Kenya', iso: 'ke', flag: '🇰🇪' },
  ];

  // Get current selected country
  const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateURL = (url: string): boolean => {
    try {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
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
      newErrors.websiteOrLinkedIn = 'Website URL is required';
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

      // Success - Save form data and show modal
      setSavedFormData({ ...formData });
      setShowSuccessModal(true);
      
      // Auto-close modal after 10 seconds
      // setTimeout(() => {
      //   handleCloseModal();
      // }, 10000);
      
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

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setFormData({
      fullName: '',
      firmName: '',
      email: '',
      whatsapp: '',
      websiteOrLinkedIn: '',
      consent: false,
    });
    setSavedFormData(null);
    setCountryCode('+1');
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

  return (
    <section id="register" className="relative py-20 md:py-32 bg-gradient-navy overflow-hidden">
      {/* Dark gradient overlay with depth */}
      <div className="absolute inset-0 bg-linear-to-br from-navy-900 via-navy-800 to-navy-950"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Glowing decorative orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-800 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-primary-800 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary-800 rounded-full blur-3xl opacity-10"></div>
      
      {/* Light rays effect */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary-800/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
              className="mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-12 3xl mx-auto">
                <div
                  className="inline-flex items-center mb-6"
                >
                  <span className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Limited Time Offer
                  </span>
                </div>

                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                  Start Your Free
                  <span className="block mt-2 font-extrabold bg-linear-to-b from-primary-500 to-primary-600 bg-clip-text text-transparent">
                    Content Week
                  </span>
                </h2>

                <p 
                  className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-6xl mx-auto"
>
                  {/* Get <strong className="text-white">5 High Quality Reels + 2 engaging Carousels</strong> 
                  <br className="hidden sm:block" /> */}
                  <strong className="text-white">Fill out the form below</strong> to claim your free week of content.
                </p>
              </div>

              {/* Error Message */}
              {submitError && (
                <div
                    className="mb-8 p-4 bg-red-500/10 backdrop-blur-sm border-l-4 border-red-500 rounded-r-lg 3xl mx-auto"
                  >
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-red-200 font-medium text-sm">{submitError}</p>
                    </div>
                  </div>
                )}

              {/* Form */}
              <form 
                onSubmit={handleSubmit} 
                className="max-w-200 mx-auto bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-white mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all bg-white/5 text-white placeholder-gray-400 ${
                        errors.fullName ? 'border-red-400 bg-red-500/10 focus:border-red-400' : 'border-white/20 hover:border-white/30 focus:border-blue-400'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p
                        className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Firm Name */}
                  <div>
                    <label htmlFor="firmName" className="block text-sm font-semibold text-white mb-2">
                      Firm Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="firmName"
                      name="firmName"
                      value={formData.firmName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all bg-white/5 text-white placeholder-gray-400 ${
                        errors.firmName ? 'border-red-400 bg-red-500/10 focus:border-red-400' : 'border-white/20 hover:border-white/30 focus:border-blue-400'
                      }`}
                      placeholder="Your Company Name"
                    />
                    {errors.firmName && (
                      <p
                        className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.firmName}
                      </p>
                    )}
                  </div>

                  {/* Work Email */}
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                      Work Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all bg-white/5 text-white placeholder-gray-400 ${
                        errors.email ? 'border-red-400 bg-red-500/10 focus:border-red-400' : 'border-white/20 hover:border-white/30 focus:border-blue-400'
                      }`}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p
                        className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Number */}
                  <div className="md:col-span-2">
                    <label htmlFor="whatsapp" className="block text-sm font-semibold text-white mb-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span>WhatsApp Number</span>
                        <span className="text-red-400">*</span>
                      </div>
                    </label>
                    <div className="flex gap-3">
                      {/* Custom Country Dropdown */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                          className="appearance-none pl-10 pr-8 py-3 border-2 border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 bg-white/5 text-white hover:border-white/30 transition-all cursor-pointer min-w-20 text-sm text-left"
                        >
                          {selectedCountry.code}
                        </button>
                        
                        {/* Flag icon overlay on the left */}
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <FlagIcon countryCode={selectedCountry.iso} className="w-5 h-4" />
                        </div>
                        
                        {/* Dropdown arrow on the right */}
                        <svg 
                          className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>

                        {/* Dropdown Menu */}
                        {isCountryDropdownOpen && (
                          <>
                            {/* Backdrop to close dropdown when clicking outside */}
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setIsCountryDropdownOpen(false)}
                            />
                            
                            {/* Options List with Perfect Scrolling */}
                            <div
                              className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto bg-gray-800/95 backdrop-blur-sm border-2 border-white/20 rounded-lg shadow-2xl z-20 custom-dropdown-scroll"
                              onWheel={(e) => e.stopPropagation()}
                              onTouchMove={(e) => e.stopPropagation()}
                            >
                                {countries.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => {
                                      setCountryCode(country.code);
                                      setIsCountryDropdownOpen(false);
                                    }}
                                    className={`w-full px-3 py-2.5 text-left text-sm hover:bg-white/10 transition-colors flex items-center gap-3 ${
                                      countryCode === country.code ? 'bg-blue-500/20 text-white font-medium' : 'text-gray-300'
                                    }`}
                                  >
                                    <FlagIcon countryCode={country.iso} className="w-5 h-4 shrink-0" />
                                    <span className="font-medium">{country.code}</span>
                                    <span className="text-gray-400 text-xs">({country.name})</span>
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                      </div>
                      <div className="relative flex-1">
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all bg-white/5 text-white placeholder-gray-400 ${
                            errors.whatsapp ? 'border-red-400 bg-red-500/10 focus:border-red-400' : 'border-white/20 hover:border-white/30 focus:border-blue-400'
                          }`}
                          placeholder="1234567890"
                        />
                      </div>
                    </div>
                    {errors.whatsapp && (
                      <p
                        className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>

                  {/* Website or LinkedIn */}
                  <div className="md:col-span-2">
                    <label htmlFor="websiteOrLinkedIn" className="block text-sm font-semibold text-white mb-2">
                      Website or LinkedIn URL <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="websiteOrLinkedIn"
                      name="websiteOrLinkedIn"
                      value={formData.websiteOrLinkedIn}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all bg-white/5 text-white placeholder-gray-400 ${
                        errors.websiteOrLinkedIn ? 'border-red-400 bg-red-500/10 focus:border-red-400' : 'border-white/20 hover:border-white/30 focus:border-blue-400'
                      }`}
                      placeholder="https://yourwebsite.com"
                    />
                    {errors.websiteOrLinkedIn && (
                      <p
                        className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.websiteOrLinkedIn}
                      </p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="md:col-span-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 border-2 rounded border-white/30 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all flex items-center justify-center group-hover:border-blue-400">
                          <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-sm text-gray-300 leading-relaxed">
                        I agree that my contact information will be used solely for registration purposes. 
                        No promotional or spam emails. <span className="text-red-400">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p
                        className="mt-1.5 text-xs text-red-400 flex items-center gap-1 ml-8"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.consent}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 md:px-8 text-base font-semibold text-white rounded-lg transition-all duration-300 mt-8 relative overflow-hidden ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed opacity-70'
                      : 'bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  
                  <span className="relative flex items-center justify-center gap-1 md:gap-2.5">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting Registration...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Claim Your Free Week</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-6 flex-wrap text-xs text-gray-300 pt-6 border-t border-white/10 mt-6">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">100% Secure</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="font-medium">No Spam</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Quick Approval</span>
                  </div>
                </div>
              </form>
            </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && savedFormData && (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl max-w-[40rem] w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success Header with Animation */}
              <div className="bg-linear-to-br from-primary-600 to-primary-800 p-8 text-center relative overflow-hidden">
                
                <div
                  className="mb-4 inline-flex"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <h2
                  className="text-3xl font-bold text-white"
                >
                  Registration Successful! 🎉
                </h2>
              </div>

              {/* Modal Content */}
              <div className="p-4 md:p-8">
                <p
                  className="text-lg text-gray-700 mb-6 text-center"
                >
                  Thanks, <strong className="text-gray-900">{savedFormData.fullName}</strong>!
                  <br />
                  We've sent a confirmation email to{' '}
                  <strong className="text-gray-900">{savedFormData.email}</strong>
                </p>

                <div
                  className="bg-gray-50 rounded-xl p-4 md:p-6 mb-6"
                >
                  <h3 className="font-bold text-lg text-gray-900 mb-4 text-center">
                    What's Next?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">
                        Check your email for confirmation and next steps
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">
                        We'll contact you on WhatsApp within 24 hours
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">
                        Prepare to receive 5 Reels + 2 Carousels for free!
                      </span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="w-full py-3 px-6 btn-primary text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  OK, Got It!
                </button>
              </div>
            </div>
          </div>
        )}
    </section>
  );
}
