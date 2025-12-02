// Application configuration

export const APP_CONFIG = {
  name: 'Growdit',
  tagline: 'Get a Free Week of Content for Your Personal Brand',
  description: 'Get a free week of professionally created content for your personal brand. Includes 5 quality reels and 2 engaging carousels.',
  url: 'https://growdit.com',
  
  // Social media
  social: {
    twitter: '@growdit',
    instagram: '@growdit',
    linkedin: 'growdit',
  },
  
  // Contact
  contact: {
    email: 'hello@growdit.com',
    support: 'support@growdit.com',
  },
  
  // Features
  offer: {
    reels: 5,
    carousels: 2,
    duration: '1 week',
  },
} as const;

// Environment variables with type safety
export const ENV = {
  googleScriptUrl: import.meta.env.VITE_GOOGLE_SCRIPT_URL,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
