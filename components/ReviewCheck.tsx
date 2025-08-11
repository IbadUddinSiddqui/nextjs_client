"use client";
import { useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Review {
  id: number;
  name: string;
  image: string;
  avatar: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Kingsley Chandler",
    image: "/images/image4.png",
    avatar: "/images/user4.png",
    text: "I bought a bamboo hanging wall décor (big size) from EcoBambo, and it's stunning! It blends beautifully with my lounge wall art and home wall art décor. The quality is far better than Wayfair and Amazon wall décor—natural, stylish, and eco-friendly! It's elegant, eco-friendly, and far better than any regular décor!!",
    rating: 5,
  },
  {
    id: 2,
    name: "Martha Lewis",
    image: "/images/image3.png",
    avatar: "/images/user3.png",
    text: "Absolutely love the craftsmanship! Delivery was on time and packaging was perfect.",
    rating: 4,
  },
  {
    id: 3,
    name: "Daniel Cooper",
    image: "/images/image2.png",
    avatar: "/images/user2.png",
    text: "Looks amazing on my wall, totally worth the price. Highly recommend!",
    rating: 5,
  },
  {
    id: 4,
    name: "Sophie Turner",
    image: "/images/image7.png",
    avatar: "/images/user1.png",
    text: "It's eco-friendly and looks premium. Happy with the purchase.",
    rating: 4,
  },
  {
    id: 5,
    name: "Michael Scott",
    image: "/images/image5.png",
    avatar: "/images/user5.png",
    text: "Very unique design. My friends keep asking where I bought it from!",
    rating: 5,
  },
  {
    id: 6,
    name: "Emma Watson",
    image: "/images/image6.png",
    avatar: "/images/user.png",
    text: "Great product and excellent customer service!",
    rating: 4,
  },
];

function Reviews(): JSX.Element {
  const [startIndex, setStartIndex] = useState<number>(0);
  const cardsToShow = 3;
  const maxIndex = reviews.length - cardsToShow;

  const nextSlide = (): void => {
    if (startIndex < maxIndex) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = (): void => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // Get the visible reviews
  const visibleReviews = reviews.slice(startIndex, startIndex + cardsToShow);

  return (
    <section className="py-12 bg-gray-50">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-8">
        Customer Reviews
      </h2>

      {/* Slider Container */}
      <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto px-4">
        {/* Prev Button */}
        <button
          onClick={prevSlide}
          disabled={startIndex === 0}
          className="flex-shrink-0 p-3 bg-white shadow-md rounded-full hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous reviews"
        >
          <FaChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Slider Content */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="mb-4 flex-shrink-0">
                  <img
                    src={review.image}
                    alt={`Product from ${review.name}'s review`}
                    className="w-full h-48 object-cover rounded-md"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = "https://placehold.co/400x300/cccccc/333333?text=Image+Not+Found";
                    }}
                  />
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-3">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="flex-1 mb-4">
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>

                {/* Avatar + Name */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <img
                    src={review.avatar}
                    alt={`Avatar of ${review.name}`}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = "https://placehold.co/50x50/e0e0e0/0a0a0a?text=User";
                    }}
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {review.name}
                    </p>
                    <p className="text-xs text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={startIndex >= maxIndex}
          className="flex-shrink-0 p-3 bg-white shadow-md rounded-full hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next reviews"
        >
          <FaChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => setStartIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              i === startIndex 
                ? "bg-blue-500 w-6" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Review Counter */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1}-{Math.min(startIndex + cardsToShow, reviews.length)} of {reviews.length} reviews
        </p>
      </div>
    </section>
  );
}

export default Reviews;