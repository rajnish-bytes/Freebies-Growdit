interface HeroProps {
  onOpenForm: () => void;
}

export default function Hero({ onOpenForm }: HeroProps) {
  return (
    <section className="relative pt-20 pb-10 md:pb-0 md:pt-32 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      {/* Static Background Gradients */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-300/40 via-primary-200/30 to-transparent rounded-full blur-3xl"
        aria-hidden="true"
      />
      
      <div
        className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-navy-300/30 via-navy-200/20 to-transparent rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 py-20 md:pb-24">
        <div className="mx-auto text-center">
          {/* Badge with Animation */}
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="inline-flex items-center mb-4"
          >
            <span className="badge bg-white/80 backdrop-blur-sm text-primary-700 border tracking-tight border-primary-300/50 shadow-lg px-4 py-2 text-sm md:text-lg font-semibold">
              <span className="inline-block mr-2">
                ✨
              </span>
              Simple way to see what we do
            </span>
          </div>

          {/* Main Headline */}
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="mb-4 md:mb-6 text-navy-900 leading-[1.1] px-4"
          >
            <span className="md:block">
              Get a free week of content
            </span>
            <span className="pl-2 md:pl-0 md:block text-gradient bg-gradient-to-r from-primary-600 via-primary-500 to-navy-600 bg-clip-text">
               for your personal brand.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-base md:text-2xl text-gray-600 mb-6 md:mb-10 mx-auto tracking-tighter px-4"
          >
            A simple preview of what your content will look like.
          </p>

          {/* CTA Button */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <button
              onClick={onOpenForm}
              className="btn btn-primary text-lg md:text-2xl tracking-tight md:px-10 md:py-5 w-auto shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform"
            >
              <span className="relative z-10">Claim Your Free Week</span>
            </button>
          </div>

          {/* Subtext */}
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-sm md:text-base text-gray-500 flex items-center justify-center gap-2 flex-wrap px-4"
          >
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No contracts
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No payments
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No pressure
            </span>
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2"
      >
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-sm text-gray-500 font-medium">Scroll to explore</span>
          <svg className="w-6 h-6 text-primary-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
