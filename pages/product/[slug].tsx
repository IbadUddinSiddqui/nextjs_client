import React, { useState } from "react";
import { useRouter } from "next/router";
import products from "../../public/data/products.json";
import ImageSlider from "../../components/ImageSlider";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { FaInstagram, FaWhatsapp, FaFacebook, FaTiktok, FaYoutube, FaStar } from "react-icons/fa";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [currentImage, setCurrentImage] = useState("");
  
  const product = products.find((p: any) => p.slug === slug);

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  // Set initial image when product is found
  React.useEffect(() => {
    if (product && product.images.length > 0) {
      setCurrentImage(product.images[0]);
    }
  }, [product]);

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 text-purple-900">
      {/* 🔹 Product Slider */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <ImageSlider 
          images={product.images} 
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
      </motion.div>

      {/* 🔹 Title + Price + Category */}
      <motion.div className="mt-8" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
        <p className="text-2xl text-green-600 font-bold mt-1">PKR {product.price}</p>
        <div className="flex gap-1 mt-2 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
      </motion.div>

      {/* 🔹 Description */}
      <Fade triggerOnce direction="up">
        <div className="mt-6 max-w-3xl text-gray-700 leading-relaxed">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p>{product.description}</p>
        </div>
      </Fade>

      {/* 🔹 Buttons */}
      <motion.div className="flex flex-wrap gap-4 mt-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.1, backgroundColor: "#6b21a8" }}
          className="bg-purple-700 text-white px-6 py-2 rounded shadow-md transition"
        >
          Add to Cart
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.1, backgroundColor: "#15803d" }}
          className="bg-green-600 text-white px-6 py-2 rounded shadow-md transition"
        >
          Order Now
        </motion.button>
      </motion.div>

      {/* 🔹 Social Media Icons */}
      <motion.div className="flex gap-5 text-2xl mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <FaInstagram className="hover:text-pink-500 cursor-pointer" />
        <FaWhatsapp className="hover:text-green-500 cursor-pointer" />
        <FaFacebook className="hover:text-blue-600 cursor-pointer" />
        <FaTiktok className="hover:text-black cursor-pointer" />
        <FaYoutube className="hover:text-red-600 cursor-pointer" />
      </motion.div>

      {/* 🔹 Why You'll Love It */}
      <Fade triggerOnce direction="left">
        <div className="grid md:grid-cols-2 gap-6 items-center mt-12">
          <img
            src={product.extraImage}
            className="rounded shadow-md w-full h-[300px] object-cover"
            alt="extra"
          />
          <div>
            <h2 className="text-xl font-bold mb-2">Why You'll Love It</h2>
            <p className="text-gray-600">
              Experience premium quality and lasting comfort with our {product.title}. Its breathable cotton fabric is perfect for any weather,
              ensuring both style and ease in your day-to-day life.
            </p>
          </div>
        </div>
      </Fade>

      {/* 🔹 More Benefits */}
      <Fade triggerOnce direction="right">
        <div className="grid md:grid-cols-2 gap-6 items-center mt-10">
          <div>
            <h2 className="text-xl font-bold mb-2">More Benefits</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Soft and breathable cotton</li>
              <li>Modern stylish cut</li>
              <li>Durable stitching</li>
              <li>Ideal for everyday use</li>
            </ul>
          </div>
          <img
            src={product.images[1]}
            className="rounded shadow-md w-full h-[300px] object-cover"
            alt="benefit"
          />
        </div>
      </Fade>

      {/* 🔹 Auto-Playing Video */}
      <Fade triggerOnce direction="up">
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Watch Product Demo</h2>
          <div className="relative w-full h-0 pb-[56.25%] rounded overflow-hidden shadow-md">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`${product.videoUrl}?autoplay=1&mute=1`}
              title="Product Demo Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </Fade>
    </div>
  );
} 