import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Examples() {
  const [fullscreenVideo, setFullscreenVideo] = useState<number | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  
  const examples = [
    {
      id: 1,
      type: "Reel",
      gradient: "from-blue-400 to-blue-600",
      videoUrl: "https://www.youtube.com/embed/p8TUR3itK4M"
    },
    {
      id: 2,
      type: "Carousel",
      gradient: "from-gray-200 to-gray-300",
      videoUrl: "https://www.youtube.com/embed/YBjd5rNi8wE"
    },
    {
      id: 3,
      type: "Reel",
      gradient: "from-purple-400 to-purple-600",
      videoUrl: "https://www.youtube.com/embed/-C36J87hju0"
    },
    {
      id: 4,
      type: "Carousel",
      gradient: "from-pink-200 to-pink-300",
      videoUrl: "https://www.youtube.com/embed/xQDeiDMpN84"
    },
    {
      id: 5,
      type: "Reel",
      gradient: "from-cyan-400 to-cyan-600",
      videoUrl: "https://www.youtube.com/embed/EdrIybETwBk"
    },
    {
      id: 6,
      type: "Carousel",
      gradient: "from-indigo-200 to-indigo-300",
      videoUrl: "https://www.youtube.com/embed/FBih9irDRcg"
    },
    {
      id: 7,
      type: "Reel",
      gradient: "from-green-400 to-green-600",
      videoUrl: "https://www.youtube.com/embed/rWgLufPBQdo"
    },
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

  return (
    <section className="bg-gradient-navy section-padding overflow-hidden relative" id="Examples">
      <div
        className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
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
        <div
          className="text-center mb-12 md:mb-16"
          data-aos="fade-up"
        >
          <div
            className="inline-flex items-center mb-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="badge bg-white/20 backdrop-blur-sm text-white border border-white/30 shadow-lg">
              Example Contents
            </span>
          </div>
          <h2
            className="text-white mb-6 leading-[1.1] tracking-tight"
            data-aos="fade-up"
            data-aos-delay="200"
          >
           Preview of what we deliver in a
            <br />
            <span className="bg-gradient-to-b from-primary-500 to-primary-600 bg-clip-text text-transparent">free content week</span>
          </h2>
          <p
            className="text-gray-300 text-lg mx-auto"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            A quick look at the actual work produced for founders like you.
          </p>
        </div>
      </div>

      <div className="relative py-6">
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all shadow-xl group"
          aria-label="Previous example"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all shadow-xl group"
          aria-label="Next example"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Navigation, Pagination]}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.5}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: false,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 28,
              centeredSlides: false,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 32,
              centeredSlides: false,
            },
          }}
          loop={true}
          className="w-full px-4 sm:px-8 md:px-16 lg:px-24"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          {examples.map((example) => (
            <SwiperSlide
              key={example.id}
            >
              <article 
                  className="relative aspect-9/16 rounded-2xl sm:rounded-3xl shadow-2xl cursor-pointer transition-all duration-500 hover:shadow-3xl hover:scale-105"
                  onClick={() => handleVideoClick(example.id)}
                >
                  <div className="absolute inset-0">
                    <iframe
                      className="w-full h-full object-cover pointer-events-none"
                      src={`${example.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${example.videoUrl.split('/').pop()}&controls=0&modestbranding=1&playsinline=1`}
                      title={`${example.type} example`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      style={{ border: 'none' }}
                    />
                    
                    <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-all pointer-events-none"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-white text-xs sm:text-sm font-semibold shadow-lg z-10"
                  >
                    {example.type}
                  </div>
                </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container-custom relative z-10">
        <div
          className="text-center mt-12"
          data-aos="fade-up"
        >
          <p className="text-gray-300 text-sm mb-6">
            Actual content will be customized to match your branding style and preferences
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {['HD Quality', 'Professional Editing', 'Trending Audio', 'Custom Branding'].map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs md:text-sm font-medium bg-white/10 border border-white/20 text-white backdrop-blur-sm hover:scale-110 hover:bg-white/20 transition-all"
              >
                <svg className="w-3 h-3 mr-1.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {fullscreenVideo !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/40 flex items-center justify-center text-white transition-all z-[100] backdrop-blur-sm shadow-lg"
            aria-label="Close fullscreen"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

            <div
            className="w-full max-w-[min(90vw,400px)] mx-auto"
            style={{
              aspectRatio: '9/16',
            }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
            <iframe
              className="w-full h-full rounded-lg sm:rounded-2xl"
              src={`${examples.find(ex => ex.id === fullscreenVideo)?.videoUrl}?autoplay=1&controls=1&loop=1&playlist=${examples.find(ex => ex.id === fullscreenVideo)?.videoUrl.split('/').pop()}`}
              title="Video example fullscreen"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              style={{ border: 'none' }}
            />
            </div>
        </div>
      )}
    </section>
  );
}

