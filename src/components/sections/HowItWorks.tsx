import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      step: "01",
      title: "Drop Your Footage",
      description: "Upload your raw clips — WeTransfer, Google Drive, Dropbox — whatever works for you.",
      image: "/process/Every Process image.png"
    },
    {
      step: "02",
      title: "We Do Our Magic",
      description: "We cut, trim, color-grade, and add engaging transitions.",
      image: "/process/Forum Image.png"
    },
    {
      step: "03",
      title: "Feedback? Easy",
      description: "Want something changed? We offer smooth revision rounds to make sure everything.",
      image: "/process/Recording image.png"
    },
    {
      step: "04",
      title: "We Do Our Magic",
      description: "We cut, trim, color-grade, and add engaging transitions.",
      image: "/process/Scripts Download Image.png"
    },
    {
      step: "05",
      title: "Feedback? Easy",
      description: "Want something changed? We offer smooth revision rounds to make sure everything.",
      image: "/process/WhatsApp Group image.png"
    },
    {
      step: "06",
      title: "Upload & Grow",
      description: "We deliver your final video in ready-to-upload YouTube format.",
      image: "/process/Review Image.png"
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
        className="absolute top-20 right-10 w-96 h-96 bg-linear-to-br from-primary-200/30 to-purple-200/30 rounded-full blur-3xl"
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
            className="inline-flex items-center mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="badge bg-primary-800 text-primary-50 border border-primary-100 shadow-md px-4 py-2 text-sm md:text-base font-semibold">
              Simple Process
            </span>
          </motion.div>
          
          <motion.h2
            className="mb-4 text-navy-900 leading-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            How it works?
          </motion.h2>

          <motion.p
            className="text-gray-600 text-lg md:text-xl tracking-tight px-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A quick overview of how we build your entire content week
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-[60rem] mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((item, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card */}
              <div className="relative bg-white rounded-3xl p-4 md:p-6 border border-gray-300/60 border-dashed hover:border-gray-400/80 transition-all h-full shadow-sm hover:shadow-md">
                
                {/* Step Number Badge */}
                <div className="absolute top-6 left-6 z-10 border border-gray-300 border-dashed inline-block px-4 py-2 rounded-xl bg-gray-50/70 backdrop-blur-sm">
                  <span className="inline-block text-gray-900 font-semibold text-lg tracking-tight">
                    {item.step}
                  </span>
                </div>

                {/* Image Placeholder */}
                <motion.div
                  className="mb-6 rounded-2xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-50 aspect-3/2 relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Overlay for placeholder effect */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent pointer-events-none" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg font-normal">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
