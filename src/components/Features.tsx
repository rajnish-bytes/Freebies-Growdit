import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      number: "5",
      title: "Quality Reels.",
      description: "Professionally crafted video content ready to post.",
      icon: "🎬",
      highlights: ["HD Quality", "Trending Audio", "Optimized Length"]
    },
    {
      number: "2",
      title: "Carousels.",
      description: "Engaging multi-slide posts that drive interaction.",
      icon: "📱",
      highlights: ["Eye-catching Design", "Swipe-worthy", "Brand Aligned"]
    }
  ];

  const categories = [
    { name: "Motivation", color: "bg-blue-100 text-blue-700 border-blue-200", emoji: "💪" },
    { name: "Storytelling", color: "bg-purple-100 text-purple-700 border-purple-200", emoji: "📖" },
    { name: "Editing", color: "bg-green-100 text-green-700 border-green-200", emoji: "✂️" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section className="relative bg-gradient-navy text-white section-padding " id="overview">
      {/* Curved Top SVG */}
      <div className="absolute top-0 left-0 w-full  leading-none rotate-180">
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
        className="absolute top-1/4 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
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
          className="text-center mb-16 md:mb-20"
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
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mr-2"
              >
                ⭐
              </motion.span>
              Overview
            </span>
          </motion.div>
          
          <motion.h2
            className="mb-6 text-white leading-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Here's what you get in your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
              free content week.
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-300 text-lg md:text-xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Premium content crafted specifically for your brand's growth
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-10 mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="group relative"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
              
              <div className="relative card p-8 md:p-10 bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-white/40 transition-all rounded-3xl overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" aria-hidden="true" />
                
                {/* Icon Badge */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm mb-6 text-4xl md:text-5xl"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <span role="img" aria-label={feature.title}>
                    {feature.icon}
                  </span>
                </motion.div>

                {/* Number and Title */}
                <div className="mb-6">
                  <motion.div
                    className="text-6xl md:text-7xl font-bold text-white mb-3 leading-none"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    transition={{ delay: 0.6 + index * 0.2, type: "spring", stiffness: 200 }}
                  >
                    {feature.number}
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {feature.highlights.map((highlight, idx) => (
                      <motion.span
                        key={idx}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs md:text-sm font-medium bg-white/10 border border-white/20 text-white"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 + idx * 0.1 }}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                      >
                        <svg className="w-3 h-3 mr-1.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Hover Indicator */}
                <motion.div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Categories Section */}
        <motion.div
          className="text-center mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Choose Your Content Focus
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            {categories.map((category, index) => (
              <motion.span
                key={index}
                className={`badge ${category.color} border-2 font-semibold text-base md:text-lg px-6 py-3 cursor-pointer`}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.2 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </motion.span>
            ))}
          </div>
          <motion.p
            className="text-gray-300 text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            We handle the entire process. You just select one.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 grid grid-cols-3 gap-6 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.7, duration: 0.8 }}
          >
            {[
              { icon: "⚡", label: "Fast Delivery", value: "48hrs" },
              { icon: "🎨", label: "Custom Design", value: "100%" },
              { icon: "♾️", label: "Revisions", value: "Unlimited" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{item.value}</div>
                <div className="text-sm md:text-base text-gray-300">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Curved Bottom SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
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
