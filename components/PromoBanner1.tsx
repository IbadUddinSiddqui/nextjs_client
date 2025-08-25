import React from 'react';
import { motion, type Variants } from 'framer-motion';

const App = () => {
  // Array of image data. 'size' property determines its visual dominance in the grid.
  // Reordered to place small photos on adjacent (diagonal) sides for desktop layout.
  const images = [
    {
      id: 1,
      src: '/images/banner-2-1.jpeg', // Wider aspect ratio
      alt: 'Big Yellow Bamboo Flower Pot',
      size: 'big', // This image will appear larger
    },
    {
      id: 2,
      src: '/images/banner-2-2.jpeg', // Wider aspect ratio
      alt: 'Large Hanging Vase',
      size: 'small', // This image will appear smaller
    },
    {
      id: 4, // Original ID 4 moved here
      src: '/images/banner-2-3.jpeg', // Wider aspect ratio
      alt: 'Big Bamboo Pot',
      size: 'small', // This image will appear smaller
    },
    {
      id: 3, // Original ID 3 moved here
      src: '/images/banner-3-3.jpeg', // Wider aspect ratio
      alt: 'Big Red Bamboo Flower Pot',
      size: 'big', // This image will appear larger
    },
  ];

  // Framer Motion variants for staggered entrance animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each child's animation
      },
    },
  };

  // Framer Motion variants for individual image card animations
  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 }, // Start slightly below, transparent, and smaller
    visible: {
      y: 0,
      opacity: 1,
      scale: 1, // Animate to full size
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-12 text-center drop-shadow-lg leading-tight">
        Coastal Farmhouse Decor House Plants for Sale!
        </h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-0" // Changed gap-2 to gap-0 for minimal spacing
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className={`
                relative overflow-hidden shadow-2xl cursor-pointer group bg-white border-2 border-white
                ${image.size === 'big' ? 'md:col-span-2' : 'md:col-span-1'}
                h-48 md:h-64 lg:h-72 // Consistent height for horizontal feel
              `}
              // Removed rounded-xl here to allow for tighter packing if desired, 
              // but you can add it back if you prefer rounded corners within a tight grid.
              variants={itemVariants}
              whileHover={{
                scale: 1.03, // Slightly zoom in on hover
                rotate: image.size === 'big' ? 1 : -1, // Subtle rotation, alternating direction based on size
              }}
              whileTap={{ scale: 0.98 }} // Slight shrink on tap
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                // Fallback for image loading errors
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Prevent infinite loop
                  target.src = `https://placehold.co/600x300/CCCCCC/000000?text=Image+Load+Error`;
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold text-center p-4">
                  {image.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-gray-400 text-sm mt-12">
          The images are now packed closely together!
        </p>
      </div>
    </div>
  );
};

export default App;
