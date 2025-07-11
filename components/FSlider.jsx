import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { FiShoppingBag } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    title: "Bamboo Hanging Art" ,
     description: "Eco-friendly wall decor with a natural rustic feel perfect for any space.",
    image: "/images/f-slide1.png",
  },
  {
    title: "Indoor Plant Pot",
    description: "Elegant handcrafted bamboo pot for modern interiors and gardens.",
    image: "/images/f-slide2.png",
  },
  {
    title: "Hanging Swing Chair",
    description: "Comfortable swing chair with bamboo elements, perfect for outdoors.",
    image: "/images/f-slide3.png",
  },
  {
    title: "Bubble Hanging Chair",
    description: "Modern clear bubble chair that fits perfectly in minimalistic homes.",
    image: "/images/f-slide4.png",
  },
  {
    title: "Wooden Plant Stand",
    description: "Space-saving wooden stand for indoor and outdoor use.",
    image: "/images/f-slide5.png",
  },
  {
    title: "Bamboo Floor Lamp",
    description: "Ambient bamboo lighting piece that enhances earthy aesthetics.",
    image: "/images/f-slide6.png",
  },
];

const FSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Dynamically detect screen size
  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerPage(1); // mobile
      else if (width < 768) setItemsPerPage(2); // tablet
      else if (width < 1024) setItemsPerPage(3); // small desktop
      else setItemsPerPage(4); // large desktop
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - itemsPerPage));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(products.length - itemsPerPage, prev + itemsPerPage)
    );
  };

  const visibleItems = products.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="bg-gray-50 py-12 px-4 relative">
      {/* Typewriter Title */}
      <h2 className="text-xl md:text-2xl text-black font-semibold text-center mt-4 mb-1">
        <Typewriter
          options={{
            strings: ["Explore Full Collection"],
            autoStart: true,
            loop: true,
            delay: 50,
          }}
        />
      </h2>

      {/* Main Heading */}
      <motion.h3
        className="text-2xl md:text-3xl text-center font-bold text-gray-800 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        All Time Popular Products
      </motion.h3>

      {/* Desktop Arrows */}
      <div className="hidden sm:block">
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white text-black p-2 rounded-full shadow hover:bg-black hover:text-white"
          disabled={currentIndex === 0}
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white text-black p-2 rounded-full shadow hover:bg-black hover:text-white"
          disabled={currentIndex + itemsPerPage >= products.length}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Product Slider with AnimatePresence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {visibleItems.map((product, index) => (
            <motion.div
              key={product.image} // unique per product
              className="rounded-xl overflow-hidden shadow group relative transition"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mobile arrows (inside image) */}
              <div className="relative h-56 w-full overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />

                {/* Mobile buttons on image */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:hidden z-10">
                  <button
                    onClick={handlePrev}
                    className="bg-white/70 text-black p-1 rounded-full shadow"
                    disabled={currentIndex === 0}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-white/70 text-black p-1 rounded-full shadow"
                    disabled={currentIndex + itemsPerPage >= products.length}
                  >
                    <FaChevronRight />
                  </button>
                </div>

                {/* Add to Cart button */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300">
                  <button className="bg-black text-white px-4 py-1 rounded-[20px] text-sm flex items-center gap-2 hover:bg-white hover:text-black border hover:border-black">
                    <FiShoppingBag className="text-base" />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="p-3">
                <p className="text-sm text-gray-800 line-clamp-1">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FSlider;
