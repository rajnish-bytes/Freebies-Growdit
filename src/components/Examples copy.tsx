import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Examples() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const examples = [
    {
      id: 1,
      type: "Reel",
      title: "Motivational Content",
      gradient: "from-blue-500 via-blue-600 to-indigo-700",
      icon: "🎬",
      description: "High-energy reels"
    },
    {
      id: 2,
      type: "Carousel",
      title: "Brand Storytelling",
      gradient: "from-purple-500 via-pink-500 to-rose-600",
      icon: "📱",
      description: "Engaging carousels"
    },
    {
      id: 3,
      type: "Reel",
      title: "Educational Tips",
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      icon: "🎬",
      description: "Value-packed reels"
    },
    {
      id: 4,
      type: "Carousel",
      title: "Product Showcase",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      icon: "📱",
      description: "Professional slides"
    },
    {
      id: 5,
      type: "Reel",
      title: "Behind The Scenes",
      gradient: "from-violet-500 via-purple-600 to-indigo-700",
      icon: "🎬",
      description: "Authentic content"
    },
    {
      id: 6,
      type: "Carousel",
      title: "Tips & Tricks",
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      icon: "📱",
      description: "Quick guides"
    }
  ];

  // Duplicate for seamless loop
  const duplicatedExamples = [...examples, ...examples];

  return (
    <section className="relative bg-gradient-navy section-padding overflow-hidden">
      {/* Curved Top SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24 md:h-32"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-1/3 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/3 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="badge bg-white/20 backdrop-blur-sm text-white border border-white/30 shadow-lg px-6 py-2.5 text-sm md:text-base font-semibold">
              <span className="mr-2">🎨</span>
              Portfolio
            </span>
          </motion.div>
          
          <motion.h2
            className="mb-6 text-white leading-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Examples from our
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
              free content week.
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Sample creations of the work you'll receive in the free week.
          </motion.p>
        </motion.div>

        {/* Marquee Container with Fade Edges */}
        <div className="relative">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-navy-900 to-transparent z-10 pointer-events-none" />
          
          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-navy-900 to-transparent z-10 pointer-events-none" />

          {/* Marquee Animation */}
          <motion.div
            className="flex gap-6 md:gap-8"
            animate={{
              x: [0, -2400],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicatedExamples.map((example) => (
              <motion.article 
              key={example.id}
              className="group relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl hover-lift cursor-pointer"
            >
              {/* Placeholder with Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${example.gradient} opacity-80 group-hover:opacity-90 transition-opacity`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">
                      {example.type === "Reel" ? "🎬" : "📱"}
                    </div>
                    <p className="text-lg font-semibold">{example.type} Example</p>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 text-navy-900 font-semibold">
                  View Example
                </div>
              </div>
            </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Note */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto px-4">
            ✨ Actual content will be customized to match your brand style and preferences
          </p>
          
          {/* Feature Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {['Professional Editing', 'Trending Audio', 'Brand Colors', 'Custom Captions'].map((tag, idx) => (
              <motion.span
                key={idx}
                className="inline-flex items-center px-4 py-2 rounded-full text-xs md:text-sm font-medium bg-white/10 border border-white/20 text-white backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.2 + idx * 0.1 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <svg className="w-3 h-3 mr-1.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Curved Bottom SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-24 md:h-32"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
