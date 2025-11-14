import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQs = () => {
  // Track which FAQ is open using its index
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How accurate is Aurea's analysis?",
      answer: "Our AI has been trained on millions of images and achieves 98% accuracy in identifying common skin conditions."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use blockchain to ensure that you have full control over your data and who can access it."
    },
    {
      question: "How quickly do I get results?",
      answer: "Results are typically delivered within seconds of uploading your photo."
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-charcoal mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <button 
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full group"
              >
                <span className="text-lg font-semibold text-charcoal text-left">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`h-5 w-5 text-melon transition-transform duration-200 ease-in-out ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div 
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index 
                    ? 'grid-rows-[1fr] opacity-100 mt-4' 
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;