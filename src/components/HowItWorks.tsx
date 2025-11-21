import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      step: "01",
      title: "Choose Your Focus",
      description: "Select your content package - motivation, storytelling, or editing focus that aligns with your brand.",
      icon: "🎯",
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "02",
      title: "Share Your Vision",
      description: "Tell us about your brand, target audience, and content preferences through our simple form.",
      icon: "💬",
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "03",
      title: "We Create Magic",
      description: "Our expert team crafts custom content tailored specifically to your personal brand and goals.",
      icon: "✨",
      color: "from-green-500 to-emerald-500"
    },
    {
      step: "04",
      title: "Review & Refine",
      description: "Preview your content and provide feedback. We'll make adjustments until it's perfect.",
      icon: "🔍",
      color: "from-orange-500 to-red-500"
    },
    {
      step: "05",
      title: "Get Your Package",
      description: "Receive your complete week of content ready to schedule, download, and post immediately.",
      icon: "📦",
      color: "from-indigo-500 to-purple-500"
    },
    {
      step: "06",
      title: "Watch It Grow",
      description: "Post your professional content and watch your engagement, followers, and brand presence soar.",
      icon: "📈",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="relative bg-white section-padding overflow-hidden" id="HowItWorks">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} aria-hidden="true" />

      {/* Decorative Gradient Orbs */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-purple-200/30 rounded-full blur-3xl"
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

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20 mx-auto"
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
            <span className="badge bg-gradient-to-r from-primary-50 to-navy-50 text-navy-700 border border-primary-200 shadow-md px-6 py-2.5 text-sm md:text-base font-semibold">
              <span className="mr-2">⚡</span>
              Simple Process
            </span>
          </motion.div>
          
          <motion.h2
            className="mb-6 text-navy-900 leading-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            How it works?
          </motion.h2>

          <motion.p
            className="text-gray-600 text-lg md:text-xl leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A quick overview of how we build your week of content. Simple, fast, and effective.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((item, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card */}
              <div className="relative card p-8 md:p-10 border-2 border-gray-100 hover:border-primary-200 transition-all h-full bg-white">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Connection Line (except last in row) */}
                {index % 3 !== 2 && index !== steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-10 w-10 h-0.5 bg-gradient-to-r from-primary-300 to-transparent" aria-hidden="true" />
                )}

                {/* Step Number Badge */}
                <motion.div
                  className={`absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center font-bold text-lg text-white shadow-lg`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {item.step}
                </motion.div>

                {/* Icon with Animation */}
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 mb-6 text-5xl group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <span role="img" aria-label={item.title}>
                    {item.icon}
                  </span>
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl md:text-2xl font-bold text-navy-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {item.description}
                </p>

                {/* Arrow Indicator */}
                <motion.div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100"
                  initial={{ x: -10 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
                >
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Timeline Visualization for Desktop */}
        <motion.div
          className="hidden lg:block mt-20 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="mx-auto text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-primary-50 to-navy-50 rounded-full border border-primary-200">
              <span className="text-3xl">⏱️</span>
              <div className="text-left">
                <div className="text-sm text-gray-600 font-medium">Average Timeline</div>
                <div className="text-2xl font-bold text-navy-900">5-7 Business Days</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
