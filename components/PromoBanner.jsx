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
              <button className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-gray-800 text-white font-semibold transition-all duration-300 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-gray-800 group-hover:text-white text-sm">
                {i === 2 ? 'Order Now' : 'Shop Now'}
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
            className="w-full h-full  object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <a href="https://ecobambo.vercel.app/products/small-bamboo-flower-pot-with-stand-stylish-indoor-artificial-pot" target="_blank" rel="noopener noreferrer">
            <button className="absolute bottom-4 left-4 px-2 py-2 rounded-full bg-gray-800 text-white font-semibold transition-all duration-300 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-gray-800 group-hover:text-white text-sm sm:text-base">
              Shop Now
            </button>
          </a>
        </motion.div>

        {/* Desktop Right Two Images */}
        <div className="hidden md:flex md:col-span-2 flex-col gap-1 h-[660px]">
          {/* Top right image */}
          <motion.div
            custom={1}
            variants={slideInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="relative group h-[52%] overflow-hidden rounded-xl"
          >
            <img
              src="/images/b-g2.png"
              alt="Banner 2"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <a href="https://ecobambo.com/products/small-bamboo-hanging-with-stand-stylish-home-wall-art-decor" target="_blank" rel="noopener noreferrer">
              <button className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-gray-800 text-white font-semibold transition-all duration-300 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-gray-800 group-hover:text-white text-sm sm:text-base">
                Shop Now
              </button>
            </a>
          </motion.div>
          {/* Bottom right image */}
          <motion.div
            custom={2}
            variants={slideInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="relative group h-1/2 overflow-hidden rounded-xl"
          >
            <img
              src="/images/b-g3.png"
              alt="Banner 3"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <a href="https://ecobambo.com/products/1-unique-bamboo-wall-hanging-affordable-home-wall-art-decor-in-small-sizes-for-living-areas" target="_blank" rel="noopener noreferrer">
              <button className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-gray-800 text-white font-semibold transition-all duration-300 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-gray-800 group-hover:text-white text-sm sm:text-base">
                Order Now
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
