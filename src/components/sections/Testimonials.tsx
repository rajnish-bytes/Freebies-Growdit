
export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "SJ Media",
      content: "The quality of content I received was exceptional. My engagement increased by 300% in just the first week. Highly recommended for anyone serious about their personal brand!",
      metric: "300% Growth",
      avatar: "https://i.pravatar.cc/150?img=1",
      initials: "SJ",
      color: "bg-blue-500"
    },
    {
      name: "Michael Chen",
      role: "Entrepreneur",
      company: "TechStart Inc",
      content: "I was skeptical at first, but the free week completely changed my mind. The reels were professionally edited and the carousels were perfectly designed for my audience.",
      metric: "10K Followers",
      avatar: "https://i.pravatar.cc/150?img=12",
      initials: "MC",
      color: "bg-purple-500"
    },
    {
      name: "Emily Rodriguez",
      role: "Digital Marketer",
      company: "Growth Labs",
      content: "This service saved me countless hours. Instead of spending time creating content, I can focus on growing my business. The ROI has been incredible!",
      metric: "20hrs Saved",
      avatar: "https://i.pravatar.cc/150?img=5",
      initials: "ER",
      color: "bg-pink-500"
    },
    {
      name: "David Williams",
      role: "Social Media Manager",
      company: "Brand Studio",
      content: "The team understood exactly what I needed. Every piece of content aligned perfectly with my brand voice and aesthetic. Can't imagine going back to creating content alone.",
      metric: "Perfect Match",
      avatar: "https://i.pravatar.cc/150?img=13",
      initials: "DW",
      color: "bg-green-500"
    },
    {
      name: "Jessica Park",
      role: "Influencer",
      company: "Lifestyle Brand",
      content: "Best decision I made for my personal brand this year. The content quality is consistently high, and my followers have noticed the improvement immediately.",
      metric: "Premium Quality",
      avatar: "https://i.pravatar.cc/150?img=9",
      initials: "JP",
      color: "bg-indigo-500"
    },
    {
      name: "Marcus Thompson",
      role: "Business Coach",
      company: "Success Academy",
      content: "Professional, creative, and results-driven. The free week proved the value, and I've been a paying customer ever since. This is the future of content creation!",
      metric: "Long-term Partner",
      avatar: "https://i.pravatar.cc/150?img=14",
      initials: "MT",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="relative section-padding overflow-hidden" id="testimonials">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          className="text-center mb-16 md:mb-20 mx-auto"
          data-aos="fade-up"
        >
          <div
            className="inline-flex items-center mb-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="badge bg-primary-800 text-primary-50 border border-primary-100 shadow-md px-4 py-2 text-sm md:text-base font-semibold">
              Testimonial
            </span>
          </div>
          
          <h2
            className="mb-6 text-navy-900 leading-tight px-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            What our clients say
          </h2>

          <p
            className="text-gray-600 text-lg md:text-xl leading-relaxed px-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Real results from real creators who transformed their brand with our content.
          </p>
        </div>

        {/* Grid Container with Lines */}
        <div className="relative">
          
          {/* Testimonials Grid with Dividers */}
          <div className="grid lg:grid-cols-3 gap-0">
            {testimonials.map((testimonial, index) => (
              <article
                key={index}
                className="relative p-8 md:p-10 bg-white border-b border-r border-gray-200 lg:last:border-r-0 lg:nth-[3n]:border-r-0 nth-last-[-n+3]:border-b-0 group hover:bg-gray-50 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                
                {/* Modern Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-gray-900 via-gray-600 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Quote Mark */}
                <div className="mb-6">
                  <svg className="w-10 h-10 text-gray-200 group-hover:text-gray-900 transition-colors" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>

                {/* Content */}
                <blockquote className="mb-8">
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg group-hover:text-gray-900 transition-colors">
                    {testimonial.content}
                  </p>
                </blockquote>

                {/* Metric with Modern Design */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 group-hover:bg-gray-900 group-hover:border-gray-900 transition-all">
                    <div className="w-2 h-2 rounded-full bg-gray-900 group-hover:bg-white"></div>
                    <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider group-hover:text-white">
                      {testimonial.metric}
                    </p>
                  </div>
                </div>

                {/* Author Info */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div className={`w-14 h-14 rounded-full ${testimonial.color} flex items-center justify-center text-white font-semibold text-lg shadow-md overflow-hidden ring-2 ring-white group-hover:ring-gray-900 transition-all`}>
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <span className="hidden">{testimonial.initials}</span>
                      </div>
                      {/* Verified Badge on Avatar */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center ring-2 ring-white group-hover:bg-blue-500 transition-colors">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Author Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-base md:text-lg mb-1 truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-0.5 truncate">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
