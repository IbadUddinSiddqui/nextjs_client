import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Custom Typewriter component (reused for consistency)
type CustomTypewriterProps = {
  strings: string[];
  delay?: number;
  loop?: boolean;
};

const CustomTypewriter: React.FC<CustomTypewriterProps> = ({
  strings,
  delay = 10,
  loop = true,
}) => {
  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = strings[stringIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentString.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setStringIndex((prev) => (prev + 1) % strings.length);
        }
      }, delay / 2);
    } else {
      timeout = setTimeout(() => {
        setText(currentString.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex === currentString.length) {
          if (loop) {
            setIsDeleting(true);
          }
        }
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, stringIndex, strings, delay, loop]);

  return <span>{text}</span>;
};

// Animation Variants for initial product card entrance
const cardEntranceVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const App = () => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use useScroll to track horizontal scroll progress of the container
  const { scrollXProgress } = useScroll({ container: scrollRef });

  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Elegant Ceramic Vase",
      description: "Hand-crafted for modern interiors.",
      price: "$49.99",
      image: "https://placehold.co/300x400/FF5733/FFFFFF?text=Vase",
      link: "#"
    },
    {
      id: 2,
      name: "Lush Green Plant",
      description: "Brings natural beauty to any room.",
      price: "$29.99",
      image: "https://placehold.co/300x400/33FF57/FFFFFF?text=Plant",
      link: "#"
    },
    {
      id: 3,
      name: "Minimalist Wall Art",
      description: "Abstract design for contemporary spaces.",
      price: "$79.99",
      image: "https://placehold.co/300x400/3357FF/FFFFFF?text=Art",
      link: "#"
    },
    {
      id: 4,
      name: "Cozy Throw Blanket",
      description: "Soft and warm, perfect for relaxation.",
      price: "$39.99",
      image: "https://placehold.co/300x400/FFC300/FFFFFF?text=Blanket",
      link: "#"
    },
    {
      id: 5,
      name: "Scented Candle Set",
      description: "Creates a calming and inviting atmosphere.",
      price: "$24.99",
      image: "https://placehold.co/300x400/DAF7A6/000000?text=Candle",
      link: "#"
    },
    {
      id: 6,
      name: "Geometric Planter",
      description: "Modern design for your favorite plants.",
      price: "$34.99",
      image: "https://placehold.co/300x400/C70039/FFFFFF?text=Planter",
      link: "#"
    },
  ];

  // Define the scale transform for the animated text div
  // It scales from 1 (full size) down to 0 (disappears)
  // as scrollXProgress goes from 0 to 0.2 (adjust this range for desired speed)
  const textScale = useTransform(
    scrollXProgress,
    [0, 0.2], // When scrollXProgress is 0, scale is 1. When it's 0.2, scale is 0.
    [1, 0]
  );

  // Define the opacity transform for the animated text div to fade out
  const textOpacity = useTransform(
    scrollXProgress,
    [0, 0.15], // Starts fading at 0, fully transparent at 0.15
    [1, 0]
  );

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      const el = element as HTMLElement;
      const scrollLeft = el.scrollLeft;
      const scrollWidth = el.scrollWidth - el.clientWidth;

      if (scrollWidth > 0) {
        // Find the width of the first child (text div) safely
        const textDivWidth = (() => {
          const firstChild = (element as HTMLElement).children[0] as HTMLElement | undefined;
          return firstChild ? firstChild.offsetWidth : 0;
        })();

        // Calculate the scrollable width for products only
        const productsScrollableWidth = scrollWidth - textDivWidth;

        // Adjust scrollLeft to start counting from after the text div
        const adjustedScrollLeft = Math.max(0, scrollLeft - textDivWidth);

        // Calculate progress based on product scrolling only
        const progress = (adjustedScrollLeft / productsScrollableWidth) * 100;
        setScrollProgress(isNaN(progress) || !isFinite(progress) ? 0 : progress);
      } else {
        setScrollProgress(0);
      }
    };

    (element as HTMLElement).addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      (element as HTMLElement).removeEventListener('scroll', handleScroll);
    };
  }, [products]); // Recalculate if products change

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto w-full">
        {/* Product Slider Container - now includes the animated text */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll snap-x snap-mandatory pb-8 space-x-6 md:space-x-8 lg:space-x-10 px-4 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Animated Title as the first item in the slider */}
          <motion.div
            className="flex-none w-64 md:w-72 lg:w-80 bg-indigo-700 text-white rounded-xl shadow-xl overflow-hidden snap-start flex items-center justify-center p-6 text-center"
            // Removed initial and animate x transforms
            transition={{ duration: 0.8, ease: "easeOut" }}
            // Apply the animated scale and opacity transforms
            style={{ scale: textScale, opacity: textOpacity }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight drop-shadow-sm">
              <CustomTypewriter
                strings={["Explore Our Latest Products!", "Handpicked for Your Home!", "Shop Unique Decor & Plants!"]}
                delay={70}
                loop={true}
              />
            </h2>
          </motion.div>

          {/* Product Cards - NO X TRANSFORM FROM SCROLL */}
          {products.map((product, index) => (
            <motion.a
              key={product.id}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-none w-64 md:w-72 lg:w-80 bg-white rounded-xl shadow-xl overflow-hidden snap-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } 
                }
              }}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-t-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://placehold.co/300x400/CCCCCC/000000?text=Image+Error`;
                }}
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">{product.price}</span>
                  <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors duration-200 shadow-md">
                    View Product
                  </button>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-2.5 mt-8 overflow-hidden">
          <motion.div
            className="bg-indigo-500 h-full rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </section>
  );
};

export default App;
