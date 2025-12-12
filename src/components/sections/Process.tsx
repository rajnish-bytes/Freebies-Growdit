
export default function Process() {
  const steps = [
    {
      step: "01",
      title: "Submit Your Details",
      description: "Share your info so we clearly understand your brand positioning.",
      image: "/process/Forum Image.png"
    },
    {
      step: "02",
      title: "Join Your WhatsApp Group",
      description: "We’ll add you to your personal WhatsApp group for coordination.",
      image: "/process/WhatsApp Group image.png"
    },
    {
      step: "03",
      title: "Get Your Custom Scripts",
      description: "We’ll create scripts tailored precisely to your tone and niche.",
      image: "/process/Scripts Download Image.png"
    },
    {
      step: "04",
      title: "Record Your Clips Easily",
      description: "You’ll receive clear steps showing what to record and how.",
      image: "/process/Recording image.png"
    },
    {
      step: "05",
      title: "We Handle Everything Else",
      description: "We’ll manage editing, design, and delivery for your content.",
      image: "/process/Every Process image.png"
    },
    {
      step: "06",
      title: "Review, Approve & Post",
      description: "You review the final output, request tweaks if needed, and post.",
      image: "/process/Review Image.png"
    }
  ];

  return (
    <section className="relative section-padding overflow-hidden" id="Process">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} aria-hidden="true" /> */}

      {/* Decorative Gradient Orbs */}
      <div
        className="absolute top-20 right-10 w-96 h-96 bg-linear-to-br from-primary-200/30 to-purple-200/30 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
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
              Simple Process
            </span>
          </div>
          
          <h2
            className="mb-4 text-navy-900 leading-tight px-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            How it works?
          </h2>

          <p
            className="text-gray-600 text-lg md:text-xl tracking-tight px-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            A quick overview of how we build your entire content week
          </p>
        </div>

        {/* Steps Grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-[60rem] mx-auto"
        >
          {steps.map((item, index) => (
            <article
              key={index}
              className="group relative hover:-translate-y-1 transition-transform"
              data-aos="fade-up"
              data-aos-delay={100 * index}
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
                <div
                  className="mb-6 rounded-2xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-50 aspect-5/3 relative hover:scale-105 transition-transform"
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover scale-105"
                    loading="lazy"
                  />
                  {/* Overlay for placeholder effect */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg font-normal">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
