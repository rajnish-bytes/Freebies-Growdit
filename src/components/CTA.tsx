import { motion } from 'framer-motion';

interface CTAProps {
  onOpenForm: () => void;
}

export default function CTA({ onOpenForm }: CTAProps) {
  return (
    <section className="bg-white relative section-padding overflow-hidden" id="claim">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} aria-hidden="true" />

      {/* Decorative Gradient */}
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-purple-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      <div className="container-custom">
        <div className=" mx-auto">
          {/* CTA Card */}
          <article className="relative bg-gradient-navy rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-400 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative text-center">
              <h2 className="mb-6 text-white">
                Ready to start your free content week?
              </h2>
              <p className="text-gray-200 text-lg md:text-xl mb-8 mx-auto">
                Join hundreds of creators who are already growing their personal brand with professional content.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <button
                  onClick={onOpenForm}
                  className="btn bg-white text-navy-900 hover:bg-gray-100 shadow-xl hover:shadow-2xl text-base md:text-lg px-8 py-4 w-full sm:w-auto focus:ring-white"
                >
                  Claim Your Free Week
                </button>
              </div>

              {/* Subtext */}
              <p className="text-sm text-gray-300">
                No credit card required • Start in minutes
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
