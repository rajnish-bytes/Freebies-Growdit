import { lazy, Suspense } from 'react';
import { useSmoothScroll, useScrollTo } from '@hooks/index';
import { Header } from '@components/sections';
import { LoadingSpinner, PageLoader } from '@components/common';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load heavy components for better performance
const Hero = lazy(() => import('@components/sections/Hero'));
const Features = lazy(() => import('@components/sections/Features'));
const HowItWorks = lazy(() => import('@components/sections/HowItWorks'));
const Examples = lazy(() => import('@components/sections/Examples'));
const Testimonials = lazy(() => import('@components/sections/Testimonials'));
const FAQ = lazy(() => import('@components/sections/FAQ'));
const InlineRegistrationForm = lazy(() => import('@components/forms/InlineRegistrationForm'));
const Footer = lazy(() => import('@components/sections/Footer'));

function App() {
  // Use custom hooks
  useSmoothScroll();
  const { scrollToElement } = useScrollTo();

  const scrollToRegister = () => {
    scrollToElement('register', { offset: 80 });
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Header is loaded immediately (above the fold) */}
        <Header onOpenForm={scrollToRegister} />
        
        <main id="main-content">
          {/* Hero section with its own loading state */}
          <Suspense fallback={<PageLoader />}>
            <Hero onOpenForm={scrollToRegister} />
          </Suspense>

          {/* Other sections with loading spinner */}
          <Suspense fallback={<LoadingSpinner />}>
            <Features />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <HowItWorks />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <Examples />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <Testimonials />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <InlineRegistrationForm />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <FAQ />
          </Suspense>
        </main>

        {/* Footer with minimal loading state */}
        <Suspense fallback={<div className="h-32 bg-gray-900" />}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
