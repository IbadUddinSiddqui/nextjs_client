import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Is a Rocking Chair Automatic Safe for Outdoor Use?",
    answer:
      "Yes, automatic rocking chairs are crafted with high-quality weather-resistant materials that make them perfect for outdoor use. These chairs are not just functional but also elevate the look of your outdoor setting—whether it’s a bamboo canopy in your lawn, a stylish gazebo, or a relaxing setup near flower pots and hanging bamboo décor. They’re a great match for bamboo furniture and provide comfort and motion for your garden seating area.",
  },
  {
    question: "What Makes the Hanging Bubble Chair So Popular?",
    answer:
    "The hanging bubble chair stands out for its futuristic design and floating comfort. It adds a luxurious touch to both indoor and outdoor spaces. Especially when combined with bamboo swings, porch setups, or decorative items like bamboo wall hangings and artificial flower pots, it becomes a centerpiece. This chair blends perfectly with bamboo house styles and enhances the visual appeal of eco-friendly interiors",
  },
  {
    question: "Can I Buy a Porch Swing That Fits Small Lawns?",
    answer:
    "Yes, compact porch swings are now widely available and are perfect for small patios, balconies, and limited garden areas. You can create a complete bamboo-inspired corner by pairing these swings with baby furniture sets, bamboo chairs and tables, or even lightweight outdoor flower pots. This not only saves space but also turns any corner into a peaceful, natural retreat using Eco Bamboo  elegant products.",
  },
  {
    question: "Is the Outdoor Hammock Chair Comfortable for Long Use?",
    answer:
   "Definitely! Outdoor hammock chairs are built with ergonomic support and breathable materials, offering long-lasting comfort. Ideal for lounging under bamboo canopies or pergolas, they can be beautifully matched with bamboo carports, swings, and relaxing setups in your garden. Whether placed in a lawn or on a porch, this chair enhances both the comfort and the organic feel of your bamboo-themed outdoor living",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      {/* Title */}
      <motion.h2
        className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        Everything You Need to Know
      </motion.h2>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleFAQ(index)}
            className="rounded-md p-4 sm:p-5 md:p-6 bg-white shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm sm:text-base md:text-lg text-gray-800">
                {faq.question}
              </p>

              <motion.div
                initial={false}
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {openIndex === index ? (
                  <FiMinus className="text-xl text-gray-600" />
                ) : (
                  <FiPlus className="text-xl text-gray-600" />
                )}
              </motion.div>
            </div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
