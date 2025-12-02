import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Examples() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [fullscreenVideo, setFullscreenVideo] = useState<number | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  
  const examples = [
    {
      id: 1,
      type: "Reel",
      gradient: "from-blue-400 to-blue-600",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: 2,
      type: "Carousel",
      gradient: "from-gray-200 to-gray-300",
      videoUrl: "https://www.w3schools.com/html/movie.mp4"
    },
    {
      id: 3,
      type: "Reel",
      gradient: "from-purple-400 to-purple-600",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: 4,
      type: "Carousel",
      gradient: "from-pink-200 to-pink-300",
      videoUrl: "https://www.w3schools.com/html/movie.mp4"
    },
    {
      id: 5,
      type: "Reel",
      gradient: "from-cyan-400 to-cyan-600",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: 6,
      type: "Carousel",
      gradient: "from-indigo-200 to-indigo-300",
      videoUrl: "https://www.w3schools.com/html/movie.mp4"
    },
    {
      id: 7,
      type: "Reel",
      gradient: "from-green-400 to-green-600",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: 8,
      type: "Carousel",
      gradient: "from-orange-200 to-orange-300",
      videoUrl: "https://www.w3schools.com/html/movie.mp4"
    },
    {
      id: 9,
      type: "Reel",
      gradient: "from-red-400 to-red-600",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: 10,
      type: "Carousel",
      gradient: "from-teal-200 to-teal-300",
      videoUrl: "https://www.w3schools.com/html/movie.mp4"
    }
  ];

  const handleVideoClick = (id: number) => {
    setFullscreenVideo(id);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleDotClick = (index: number) => {
    swiperInstance?.slideTo(index);
  };

  return (
    <section className="bg-gradient-navy section-padding overflow-hidden relative" ref={ref} id="Examples">
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, -50, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
      />

      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
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
            <span className="badge bg-white/20 backdrop-blur-sm text-white border border-white/30 shadow-lg">
              <span className="mr-2">🎨</span>
              Portfolio
            </span>
          </motion.div>
          <motion.h2
            className="mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Examples from our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-300 via-purple-300 to-pink-300">
              free content week.
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-300 text-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Sample creations of the work you'll receive in the free week.
          </motion.p>
        </motion.div>
      </div>

      <div className="relative py-6">
        <motion.button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all shadow-xl group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 0.5 }}
          aria-label="Previous example"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all shadow-xl group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 0.5 }}
          aria-label="Next example"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          loop={true}
          className="w-full px-4 sm:px-8 md:px-16 lg:px-24"
        >
          {examples.map((example, index) => (
            <SwiperSlide
              key={example.id}
              className="!w-56 sm:!w-64 md:!w-72 lg:!w-80 xl:!w-96"
            >
              {({ isActive }) => (
                <motion.article 
                  className={`relative aspect-9/16 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-500 ${
                    isActive 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-100 scale-90 grayscale-50 blur-xs filter'
                  }`}
                  onClick={() => {
                    if (isActive) {
                      handleVideoClick(example.id);
                    } else {
                      swiperInstance?.slideTo(index);
                    }
                  }}
                  whileHover={{ 
                    scale: isActive ? 1.02 : 0.92,
                  }}
                >
                  <div className="absolute inset-0">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={example.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-all"></div>
                    
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center">
                          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <motion.div
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-white text-xs sm:text-sm font-semibold shadow-lg z-10"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {example.type}
                  </motion.div>
                </motion.article>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 md:mt-12">
        {examples.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-300"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-gray-300 text-sm mb-6">
            ✨ Actual content will be customized to match your brand style and preferences
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {['HD Quality', 'Professional Editing', 'Trending Audio', 'Custom Branding'].map((tag, idx) => (
              <motion.span
                key={idx}
                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs md:text-sm font-medium bg-white/10 border border-white/20 text-white backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1 + idx * 0.1 }}
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

      {fullscreenVideo !== null && (
        <motion.div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
            aria-label="Close fullscreen"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <motion.div
            className="w-full max-w-4xl aspect-9/16 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              controls
              loop
            >
              <source src={examples.find(ex => ex.id === fullscreenVideo)?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
