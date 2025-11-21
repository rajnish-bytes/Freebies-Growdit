import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      image: "👩‍💼",
      content: "The quality of content I received was exceptional. My engagement increased by 300% in just the first week. Highly recommended for anyone serious about their personal brand!",
      rating: 5,
      verified: true,
      metric: "300% Growth"
    },
    {
      name: "Michael Chen",
      role: "Entrepreneur",
      image: "👨‍💼",
      content: "I was skeptical at first, but the free week completely changed my mind. The reels were professionally edited and the carousels were perfectly designed for my audience.",
      rating: 5,
      verified: true,
      metric: "10K Followers"
    },
    {
      name: "Emily Rodriguez",
      role: "Digital Marketer",
      image: "👩",
      content: "This service saved me countless hours. Instead of spending time creating content, I can focus on growing my business. The ROI has been incredible!",
      rating: 5,
      verified: true,
      metric: "20hrs Saved"
    },
    {
      name: "David Williams",
      role: "Social Media Manager",
      image: "👨",
      content: "The team understood exactly what I needed. Every piece of content aligned perfectly with my brand voice and aesthetic. Can't imagine going back to creating content alone.",
      rating: 5,
      verified: true,
      metric: "Perfect Match"
    },
    {
      name: "Jessica Park",
      role: "Influencer",
      image: "👩‍🦰",
      content: "Best decision I made for my personal brand this year. The content quality is consistently high, and my followers have noticed the improvement immediately.",
      rating: 5,
      verified: true,
      metric: "5⭐ Quality"
    },
    {
      name: "Marcus Thompson",
      role: "Business Coach",
      image: "👨‍🏫",
      content: "Professional, creative, and results-driven. The free week proved the value, and I've been a paying customer ever since. This is the future of content creation!",
      rating: 5,
      verified: true,
      metric: "Long-term Client"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white section-padding overflow-hidden" id="testimonials">
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
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
            <span className="badge bg-gradient-to-r from-yellow-50 to-orange-50 text-orange-700 border border-orange-200 shadow-md px-6 py-2.5 text-sm md:text-base font-semibold">
              <span className="mr-2">💬</span>
              Success Stories
            </span>
          </motion.div>
          
          <motion.h2
            className="mb-6 text-navy-900 leading-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            What our clients say
          </motion.h2>

          <motion.p
            className="text-gray-600 text-lg md:text-xl leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Real results from real creators who transformed their brand with our content.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="mt-10 flex items-center justify-center gap-8 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">500+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">98%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10  mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative card p-8 md:p-9 bg-white border-2 border-gray-100 hover:border-primary-200 transition-all h-full">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-6xl text-primary-100 opacity-50 group-hover:opacity-100 transition-opacity">
                  "
                </div>

                {/* Verified Badge */}
                {testimonial.verified && (
                  <motion.div
                    className="absolute -top-3 -right-3 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-full p-2 shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}

                {/* Rating */}
                <div className="flex gap-1 mb-5" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{ delay: 0.9 + index * 0.05 + i * 0.05, type: "spring", stiffness: 300 }}
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </motion.svg>
                  ))}
                </div>

                {/* Content */}
                <blockquote className="relative z-10">
                  <p className="text-gray-700 leading-relaxed mb-6 text-base">
                    "{testimonial.content}"
                  </p>
                </blockquote>

                {/* Metric Badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-primary-50 to-navy-50 text-primary-700 border border-primary-200">
                    <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    {testimonial.metric}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                  <motion.div
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-navy-600 flex items-center justify-center text-2xl shrink-0 shadow-md"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {testimonial.image}
                  </motion.div>
                  <div>
                    <div className="font-semibold text-navy-900 text-base">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
