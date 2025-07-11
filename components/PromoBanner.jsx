import React from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

// Animation Variants
const slideInVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const PromoBanner = () => {
  return (
    <section className="py-8 px-4 bg-white">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold text-center mb-8 text-black">
        <Typewriter
          options={{
            strings: ["Coastal Farmhouse Decor House Plants for Sale!"],
            autoStart: true,
            loop: true,
            delay: 10,
          }}
        />
      </h2>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-2 sm:gap-2">
        
        {/* Mobile */}
        <div className="flex flex-col gap-2 md:hidden">
          {[1, 2, 3].map((n, i) => (
            <motion.div
              key={n}
              custom={i}
              variants={slideInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="relative group h-[250px] rounded-xl overflow-hidden"
            >
              <img
                src={`/images/b-g${n}.png`}
                alt={`Banner ${n}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-black text-white font-semibold transition-all duration-300 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white group-hover:text-black text-sm">
                Shop Now
              </button>
            </motion.div>
          ))}
        </div>

        {/* Desktop Left Large Image */}
        <motion.div
          variants={slideInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          custom={0}
          className="hidden md:block md:col-span-3 h-[600px] lg:h-[665px]   relative group overflow-hidden rounded-xl"
        >
          <img
            src="/images/b-g1.png"
            alt="Banner 1"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-black text-white font-semibold transition-all duration-300 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white group-hover:text-black text-sm sm:text-base">
            Shop Now
          </button>
        </motion.div>

        {/* Desktop Right Two Images */}
        <div className="hidden md:flex md:col-span-2 flex-col gap-2 h-[660px]">
          {[2, 3].map((n, i) => (
            <motion.div
              key={n}
              custom={i + 1}
              variants={slideInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="relative group h-1/2 overflow-hidden rounded-xl"
            >
              <img
                src={`/images/b-g${n}.png`}
                alt={`Banner ${n}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-black text-white font-semibold transition-all duration-300 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white group-hover:text-black text-sm sm:text-base">
                Shop Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
