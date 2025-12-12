import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  category?: string;
}

function FAQItem({ question, answer, isOpen, onToggle, index, category }: FAQItemProps) {
  return (
    <article
      className="border-b border-gray-200 last:border-b-0"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <button
        type="button"
        className="w-full py-6 md:py-8 px-4 md:px-6 flex items-center justify-between text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex-1 pr-6">
          {category && (
            <span className="inline-block text-xs font-semibold text-primary-600 mb-2 uppercase tracking-wider">
              {category}
            </span>
          )}
          <h3 className="text-lg md:text-xl font-bold text-navy-900 group-hover:text-primary-600 transition-colors">
            {question}
          </h3>
        </div>
        <div
          className="shrink-0 w-10 h-10 rounded-full bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center transition-all"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <svg 
            className="w-5 h-5 text-primary-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {isOpen && (
          <div
            className="overflow-hidden"
          >
            <div className="pb-6 md:pb-8 px-4 md:px-6 pr-16 md:pr-20">
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {answer}
              </p>
            </div>
          </div>
        )}
    </article>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is this really free?",
      answer: "Yes. Your first week of content is completely free. It’s simply a way to show what we do before either of us commits.",
      category: "Pricing"
    },
    {
      question: "Will the content match my branding and niche?",
      answer: "Yes. We tailor everything to your brand colors, tone, messaging, and niche. Your reels are built specifically around your positioning, not templates.",
      category: "Quality"
    },
    {
      question: "How long does it take for content to be created?",
      answer: "You’ll receive your free content week within 5 to 7 business days after we get your recordings.",
      category: "Timeline"
    },
    {
      question: "Do I need to sign anything to get started?",
      answer: "No contracts and no commitments. You get the free content week with zero obligations. Decide later if you want to continue.",
      category: "Commitments"
    },
    {
      question: "What happens after this free week ends?",
      answer: "After free week ends if you like the final output, you can continue with any of our paid services. If not, no problem you keep all the content and can post it wherever you want. No sales pressure!",
      category: "Billing"
    },
    {
      question: "What if the content needs changes?",
      answer: "We offer unlimited revisions during your free week to ensure you're 100% satisfied. If something isn't quite right, just let us know and we'll make it perfect.",
      category: "Support"
    }
  ];

  return (
    <section className="relative section-padding overflow-hidden" id="FAQs">
      <div className="container-custom relative z-10">
        <div className="mx-auto">
          {/* Section Header */}
          <div
            className="mb-12 md:mb-16 text-center"
            data-aos="fade-up"
          >
            <div
            className="inline-flex items-center mb-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="badge bg-primary-800 text-primary-50 border border-primary-100 shadow-md px-4 py-2 text-sm md:text-base font-semibold">
              FAQs
            </span>
          </div>
            
            <h2
              className="mb-6 text-navy-900 leading-tight px-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Got Questions?
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r via-primary-500 from-primary-600 to-primary-600">
                We Got Answers
              </span>
            </h2>
            
            <p
              className="text-gray-600 text-lg md:text-xl leading-relaxed px-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Everything you should know about the free content week.
            </p>
          </div>

          {/* FAQ List */}
          <div
            className="bg-white rounded-3xl border-2 border-gray-200 divide-y divide-gray-200 shadow-xl overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                category={faq.category}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
