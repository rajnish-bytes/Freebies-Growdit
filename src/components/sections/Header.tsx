import { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenForm: () => void;
}

export default function Header({ onOpenForm }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background
      setIsScrolled(currentScrollY > 20);
      
      // Close mobile menu when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsMobileMenuOpen(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className={`flex items-center justify-between px-4 md:px-6 py-3 md:py-4 rounded-3xl transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border border-gray-200/50' 
            : 'bg-white/80 backdrop-blur-md shadow-md border border-gray-100/50'
        }`}>
          
          {/* Logo */}
          <div data-aos="fade-up" 
            className="shrink-0"
          >
            <a 
              href="/" 
              className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 transition-all hover:text-primary-600"
              aria-label="Growdit - Home"
            >
              <img
                src="/logo.png"
                alt="Growdit logo"
                className="h-8 w-auto md:h-10 inline-block"
                draggable={false}
              />
            </a>
          </div>

          {/* Desktop Navigation - Clean & Minimal */}
          <div data-aos="fade-up" 
            className="hidden lg:flex items-center gap-8"
          >
            {[
              { href: '#overview', label: 'Overview' },
              { href: '#Process', label: 'Process' },
              { href: '#Examples', label: 'Examples' },
              { href: '#testimonials', label: 'Testimonials' },
              { href: '#FAQs', label: 'FAQ' }
            ].map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group"
                style={{ transitionDelay: `${0.2 + index * 0.05}s` }}
                onClick={(e: React.MouseEvent) => {
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
              </a>
            ))}
          </div>

          {/* CTA Button - Modern & Clean */}
          <div data-aos="fade-up" 
            className="hidden lg:flex items-center"
          >
            <button
              onClick={onOpenForm}
              className="px-5 md:px-6 py-2 md:py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-full transition-all shadow-md hover:shadow-lg btn"
              aria-label="Get started with free content week"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
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
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div data-aos="fade-up"
              className="absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden"
            >
              <div data-aos="fade-up" 
                className="py-4 px-2"
              >
                {[
                  { href: '#overview', label: 'Overview' },
                  { href: '#Process', label: 'Process' },
                  { href: '#Examples', label: 'Examples' },
                  { href: '#testimonials', label: 'Testimonials' },
                  { href: '#FAQs', label: 'FAQ' }
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-all"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
                
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenForm();
                  }}
                  className="flex items-center justify-center gap-2 mt-3 mx-2 px-6 py-3 text-white font-semibold bg-primary-600 hover:bg-primary-700 rounded-lg transition-all w-[calc(100%-1rem)] shadow-md"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
      </nav>
    </header>
  );
}
