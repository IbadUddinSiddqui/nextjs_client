// To fix the missing module and types, run the following commands in your project root:
//
// npm install embla-carousel-react
// npm install --save-dev @types/embla-carousel-react
//
// If @types/embla-carousel-react does not exist, you can skip it as the package may include its own types.
//
// Then, keep your imports as:
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
// Sample product data
const products = [
  { id: 1, name: 'Elegant Watch', price: '$199.99', image: 'https://placehold.co/250x350/FF5733/FFFFFF?text=Watch+1' },
  { id: 2, name: 'Stylish Backpack', price: '$79.99', image: 'https://placehold.co/250x350/C70039/FFFFFF?text=Backpack+2' },
  { id: 3, name: 'Wireless Headphones', price: '$129.99', image: 'https://placehold.co/250x350/900C3F/FFFFFF?text=Headphones+3' },
  { id: 4, name: 'Smart Fitness Tracker', price: '$49.99', image: 'https://placehold.co/250x350/581845/FFFFFF?text=Tracker+4' },
  { id: 5, name: 'Vintage Camera', price: '$299.99', image: 'https://placehold.co/250x350/FFC300/000000?text=Camera+5' },
  { id: 6, name: 'Noise-Cancelling Earbuds', price: '$99.99', image: 'https://placehold.co/250x350/DAF7A6/000000?text=Earbuds+6' },
  { id: 7, name: 'Portable Bluetooth Speaker', price: '$69.99', image: 'https://placehold.co/250x350/FF5733/FFFFFF?text=Speaker+7' },
  { id: 8, name: 'Classic Sunglasses', price: '$89.99', image: 'https://placehold.co/250x350/C70039/FFFFFF?text=Sunglasses+8' },
];

// ProductCard Component - Basic styling for each product item
type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden text-center my-2 mx-4
                  w-[250px] h-[350px] flex flex-col justify-between">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-3/4 object-cover rounded-t-xl"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-1 text-gray-800">{product.name}</h3>
      <p className="text-lg text-gray-600">{product.price}</p>
    </div>
  </div>
);

// AnimatedProductCard Component - Applies opacity and scale animation based on position
interface AnimatedProductCardProps {
  product: Product;
  index: number;
  currentIndex: number;
  totalSlides: number;
}

const AnimatedProductCard: React.FC<AnimatedProductCardProps> = ({ product, index, currentIndex, totalSlides }) => {
  let opacity = 1;
  let scale = 1;

  // Calculate the effective distance considering the infinite loop for a smoother transition
  const distance = index - currentIndex;
  const halfLength = totalSlides / 2;

  let effectiveDistance;
  if (Math.abs(distance) <= halfLength) {
    effectiveDistance = distance;
  } else if (distance > halfLength) {
    effectiveDistance = distance - totalSlides;
  } else { // distance < -halfLength
    effectiveDistance = distance + totalSlides;
  }

  // Adjust opacity and scale based on effective distance from the center
  if (effectiveDistance === 0) {
    // Center item
    opacity = 1;
    scale = 1.05; // Slightly larger for emphasis
  } else if (Math.abs(effectiveDistance) === 1) {
    // Immediately left/right items
    opacity = 0.7; // Slightly faded
    scale = 0.95; // Slightly smaller
  } else if (Math.abs(effectiveDistance) === 2) {
    // Two steps away
    opacity = 0.4; // More faded
    scale = 0.9; // Smaller
  } else {
    // Further away items
    opacity = 0.1; // Almost transparent
    scale = 0.8; // Smallest
  }

  // Define variants for the animation
  const cardVariants = {
    visible: { 
      opacity: opacity, 
      scale: scale,
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <motion.div
      className="flex justify-center items-center h-full" // Ensure height is full to align vertically
      style={{ opacity, scale }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <ProductCard product={product} />
    </motion.div>
  );
};

// Main App Component (Embla Carousel)
const App = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
    startIndex: 0, // Start at the first slide
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 1 },
      '(min-width: 768px) and (max-width: 1023px)': { slidesToScroll: 1 },
      '(max-width: 767px)': { slidesToScroll: 1 },
    },
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Callback to update currentSlideIndex
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlideIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Set up event listener for slide changes
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    // Initialize currentSlideIndex on mount
    onSelect(); 
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-red-200 
                    flex flex-col items-center justify-center p-4 font-inter">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 
                     text-center leading-tight rounded-lg p-3">
        Featured Products ✨
      </h1>
      <div className="w-full max-w-7xl relative"> {/* Added relative for arrow positioning */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex"> {/* Ensure flex for horizontal layout */}
            {products.map((product, index) => (
              <div key={product.id} className="embla__slide flex justify-center items-center">
                <AnimatedProductCard 
                  product={product} 
                  index={index} 
                  currentIndex={currentSlideIndex} 
                  totalSlides={products.length}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Custom Navigation Arrows */}
        <button 
          className="embla__button embla__button--prev bg-gray-700 hover:bg-gray-900 text-white rounded-full p-3 shadow-lg 
                     absolute top-1/2 -left-12 -translate-y-1/2 z-10 
                     transition-colors duration-300 transform -translate-x-full md:translate-x-0" // Responsive positioning
          onClick={scrollPrev}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <button 
          className="embla__button embla__button--next bg-gray-700 hover:bg-gray-900 text-white rounded-full p-3 shadow-lg 
                     absolute top-1/2 -right-12 -translate-y-1/2 z-10 
                     transition-colors duration-300 transform translate-x-full md:translate-x-0" // Responsive positioning
          onClick={scrollNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>

        {/* Embla dots (optional, Embla doesn't come with built-in dot components) */}
        <div className="embla__dots flex justify-center mt-4">
          {products.map((_, idx) => (
            <button
              key={idx}
              className={`embla__dot w-3 h-3 rounded-full mx-1 transition-colors duration-300
                          ${idx === currentSlideIndex ? 'bg-gray-800' : 'bg-gray-400 hover:bg-gray-600'}`}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
