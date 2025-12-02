// Component Props Types

export interface FormData {
  fullName: string;
  firmName: string;
  email: string;
  phone: string;
  interests?: string[];
  message?: string;
}

export interface HeroProps {
  onOpenForm: () => void;
}

export interface HeaderProps {
  onOpenForm: () => void;
}

export interface CTAProps {
  onOpenForm: () => void;
}

export interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface TestimonialCard {
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  rating?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ExampleContent {
  id: string | number;
  title: string;
  description: string;
  image: string;
  type: 'reel' | 'carousel' | 'post';
}
