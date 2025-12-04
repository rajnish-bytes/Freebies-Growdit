import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onOpenForm: () => void;
}

export default function Header({ onOpenForm }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background
      setIsScrolled(currentScrollY > 20);
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu when hiding
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6"
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className={`flex items-center justify-between px-4 md:px-6 py-3 md:py-4 rounded-3xl transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border border-gray-200/50' 
            : 'bg-white/80 backdrop-blur-md shadow-md border border-gray-100/50'
        }`}>
          
          {/* Logo */}
          <motion.div 
            className="shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a 
              href="/" 
              className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 transition-all hover:text-primary-600"
              aria-label="Growdit - Home"
            >
              <motion.img
                src="/logo.png"
                alt="Growdit logo"
                className="h-8 w-auto md:h-10 inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                draggable={false}
              />
            </a>
          </motion.div>

          {/* Desktop Navigation - Clean & Minimal */}
          <motion.div 
            className="hidden lg:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              { href: '#overview', label: 'Overview' },
              { href: '#Process', label: 'Process' },
              { href: '#Examples', label: 'Examples' },
              { href: '#testimonials', label: 'Testimonials' },
              { href: '#FAQs', label: 'FAQ' }
            ].map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ transitionDelay: `${0.2 + index * 0.05}s` }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {item.label}
                
                {/* Underline on hover */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Button - Modern & Clean */}
          <motion.div 
            className="hidden lg:flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={onOpenForm}
              className="px-5 md:px-6 py-2 md:py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-full transition-all shadow-md hover:shadow-lg btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Get started with free content week"
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu with AnimatePresence */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div 
                className="py-4 px-2"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {[
                  { href: '#overview', label: 'Overview' },
                  { href: '#Process', label: 'Process' },
                  { href: '#Examples', label: 'Examples' },
                  { href: '#testimonials', label: 'Testimonials' },
                  { href: '#FAQs', label: 'FAQ' }
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-all"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>{item.label}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                ))}
                
                <motion.button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenForm();
                  }}
                  className="flex items-center justify-center gap-2 mt-3 mx-2 px-6 py-3 text-white font-semibold bg-primary-600 hover:bg-primary-700 rounded-lg transition-all w-[calc(100%-1rem)] shadow-md"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
