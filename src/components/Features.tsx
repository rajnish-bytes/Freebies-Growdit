import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const offerings = [
    { 
      count: "5", 
      label: "Reels",
      detail: "Professional short-form video content",
      color: "from-blue-500/20 to-cyan-500/20",
      accent: "blue"
    },
    { 
      count: "2", 
      label: "Carousels",
      detail: "Engaging multi-slide visual posts",
      color: "from-purple-500/20 to-pink-500/20",
      accent: "purple"
    }
  ];

  return (
    <section className="relative bg-gradient-navy text-white section-padding overflow-hidden" id="overview">
      {/* Curved Top SVG */}
      <div className="absolute top-0 left-0 w-full leading-none rotate-180">
        <svg
          className="relative block w-full h-16 sm:h-20 md:h-24 lg:h-32"
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

      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-primary-500/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-20 left-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        
        {/* Header Section */}
        <motion.div
          className="max-w-7xl mb-16 sm:mb-20 md:mb-24 mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          {/* <motion.p 
            className="text-sm md:text-base font-medium text-gray-400 mb-4 uppercase tracking-[0.25em]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            Free Content Package
          </motion.p> */}

          <motion.div
            className="inline-flex items-center mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="badge bg-primary-200/10 text-primary-100   shadow-md px-4 py-2 text-sm md:text-base font-semibold">
              Simple Process
            </span>
          </motion.div>
          
          <motion.h2
            className="text-white mb-6 leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
          >
            Complete Week of Content,
            <br />
            <span className="text-gray-400">Ready to Publish</span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl tracking-tight px-4 text-gray-300 max-w-full sm:max-w-[36rem] md:max-w-[32rem] mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            Professionally crafted content delivered in 48 hours. You record, we handle everything else.
          </motion.p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 xl:gap-24 mb-12 md:mb-16 lg:mb-20 max-w-[64rem] mx-auto">
          
          {/* LEFT: Visual Showcase */}
          <motion.div
            className="relative w-full lg:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="lg:sticky lg:top-8 space-y-6 md:space-y-8">
              {offerings.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.7 + index * 0.2 }}
                >
                  {/* Card Container */}
                  <div className={`relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-linear-to-br ${item.color} backdrop-blur-sm border border-white/10`}>
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 md:gap-8">
                      {/* Large Number */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full" />
                        <div className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none">
                          {item.count}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                          {item.label}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>

                    {/* Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-white/40 via-white/10 to-transparent" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Details & Process */}
          <motion.div
            className="space-y-12 md:space-y-16 w-full lg:w-1/2"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            
            {/* What We Do */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                What We Handle
              </h3>
              
              <div className="space-y-6">
                {[
                  { title: "Content Strategy & Ideation", desc: "Viral concepts tailored to your niche" },
                  { title: "Professional Scriptwriting", desc: "Compelling scripts that convert" },
                  { title: "Advanced Video Editing", desc: "Cutting-edge effects and transitions" },
                  { title: "Visual Design & Graphics", desc: "Eye-catching branded visuals" },
                  { title: "Platform Optimization", desc: "Maximized for engagement and reach" }
                ].map((service, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-4 items-start group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 1 + idx * 0.1 }}
                  >
                    {/* Minimal Line Indicator */}
                    <div className="hidden sm:block w-8 md:w-12 h-px bg-primary-400 mt-3 group-hover:w-12 md:group-hover:w-16 transition-all" />
                    
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1">
                        {service.title}
                      </h4>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-8 md:mb-10 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        {/* Your Role */}
            <motion.div
              className="relative p-6 sm:p-8 md:p-10 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.6 }}
            >
              <div className="absolute top-0 left-8 -translate-y-1/2 px-4 py-1 bg-gradient-navy border border-white/20 rounded-full">
                <span className="text-xs uppercase tracking-wider text-gray-400">Your Role</span>
              </div>

              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 tracking-tight">
                Simply Record Yourself
              </h4>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                Follow our scripts and record your footage. We take care of ideation, editing, design, and optimization—no technical skills needed.
              </p>

              {/* Simple Checklist */}
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center sm:justify-start">
                {["No editing", "No design", "No stress"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    {item}
                  </div>
                ))}
              </div>
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
