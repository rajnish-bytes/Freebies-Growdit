import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Examples from './components/Examples';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import InlineRegistrationForm from './components/InlineRegistrationForm';
import Footer from './components/Footer';

function App() {

  // Initialize smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header onOpenForm={() => {
        document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
      }} />
      <main id="main-content">
        <Hero onOpenForm={() => {
          document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
        }} />
        <Features />
        <HowItWorks />
        <Examples />
        <Testimonials />
        <InlineRegistrationForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
