import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { shopifyFetch } from "../../lib/shopify";
import ImageSlider from "../../components/ImageSlider";
import AddToCart from "../../components/AddToCart";
import TextSlider from "../../components/TextSlider";
import Accordion from "../../components/Accordion";
import DynamicTutorialSection from "../../components/DynamicTutorialSection";
import PromoBanner from "../../components/PromoBanner";
import Reviews from "../../components/Reviews";
import FAQSection from "../../components/FAQ";
import FSlider from "../../components/FSlider";
import FeatureHighlights from "../../components/FeatureHighlights";
import RelatedProducts from "../../components/RelatedProducts";
import { FaShippingFast } from "react-icons/fa";
import DownloadGuide from "../../components/GuideImage";

interface ProductImage {
  src: string;
  altText?: string;
}

interface ProductVariant {
  id: string;
  title: string;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
}

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  productType?: string;
  tags?: string[];
  images: {
    edges: Array<{
      node: ProductImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
}

const PRODUCT_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      productType
      tags
      images(first: 10) {
        edges {
          node {
            src
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

// List of product handles for which to show the top image banner
const TUTORIAL_PRODUCT_HANDLES = [
  "large-bamboo-standing-plant-pot-unique-affordable",
  "1-unique-bamboo-wall-hanging-affordable-home-wall-art-decor-in-small-sizes-for-living-areas",
  "small-bamboo-flower-pot-with-stand-stylish-indoor-artificial-pot",
  "small-bamboo-hanging-with-stand-stylish-home-wall-art-decor"
];

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [bannerImageIndex, setBannerImageIndex] = useState<number>(0);

  useEffect(() => {
    if (!slug) return;
    // Redirect if not one of the 4 special slugs
    const specialSlugs = [
      "large-bamboo-standing-plant-pot-unique-affordable",
      "small-bamboo-flower-pot-with-stand-stylish-indoor-artificial-pot",
      "1-unique-bamboo-wall-hanging-affordable-home-wall-art-decor-in-small-sizes-for-living-areas",
      "small-bamboo-hanging-with-stand-stylish-home-wall-art-decor"
    ];
    if (!specialSlugs.includes(typeof slug === "string" ? slug : "")) {
      window.location.href = "https://ecobambo.com/products/large-bamboo-standing-plant-pot-unique-affordable";
      return;
    }
    setLoading(true);
    shopifyFetch({
      query: PRODUCT_QUERY,
      variables: { handle: slug },
    })
      .then((data) => {
        setProduct(data.productByHandle);
        if (data.productByHandle.images.edges.length > 0) {
          setCurrentImage(data.productByHandle.images.edges[0].node.src);
        }
        if (data.productByHandle.variants.edges.length > 0) {
          setSelectedVariant({
            id: data.productByHandle.variants.edges[0].node.id,
            color: data.productByHandle.variants.edges[0].node.title,
            image: data.productByHandle.images.edges[0].node.src
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  // Auto-rotate banner images every 2 seconds for tutorial products
  useEffect(() => {
    if (!product || !TUTORIAL_PRODUCT_HANDLES.includes(product.handle)) return;
    
    const interval = setInterval(() => {
      setBannerImageIndex((prevIndex) => {
        const totalImages = product.images.edges.length;
        return totalImages > 0 ? (prevIndex + 1) % totalImages : 0;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [product]);

  if (loading || !product) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-600">Error: {error}</div>;

  // Transform Shopify data to match original structure
  const images = product.images.edges.map(edge => edge.node.src);
  if (product.handle === "small-bamboo-flower-pot-with-stand-stylish-indoor-artificial-pot") {
    images.push(
      "https://cdn.shopify.com/s/files/1/0605/7974/1763/files/13_95a2bf96-f58a-4587-862e-1d0b56fb5b21.png?v=1744532370",
      "https://cdn.shopify.com/s/files/1/0605/7974/1763/files/12_8843d7d3-1909-4806-9a81-c201189113eb.png?v=1744532287"
    );
  }
  const price = product.variants.edges[0]?.node.priceV2.amount || "N/A";
  const currency = product.variants.edges[0]?.node.priceV2.currencyCode || "";
  
  // Mock data to match original structure
  const productData = {
    title: product.title,
    ratings: "66+ (ratings)",
    note: "Selling fast! 10 people have this in their carts.",
    price: `${currency} ${price}`,
    originalPrice: `${currency} ${(parseFloat(price) * 1.17).toFixed(2)}`,
    discount: "15% OFF",
    deliveryEstimate: "Order in the next 23 hour(s) 54 minute(s) to get it between [26_March] and [29_March]",
    images: images,
    variants: product.variants.edges.map((edge, index) => ({
      id: edge.node.id,
      color: edge.node.title,
      image: images[index] || images[0]
    })),
    description: product.description
  };

  const handleColorClick = (variant: any) => {
    setSelectedVariant(variant);
    setCurrentImage(variant.image);
  };

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden mt-24">
      {/* Top Product Banner Image for Special Products Only */}
      {product.handle === "large-bamboo-standing-plant-pot-unique-affordable" && (
        <div className="w-full flex justify-center bg-white pt-6 pb-2">
          <img
            src="https://cdn.shopify.com/s/files/1/0605/7974/1763/files/3_72a8fb27-ea97-4d14-a000-482366550b88.png?v=1743105124"
            alt="Product Banner"
            className="w-full max-w-6xl h-auto max-h-[500px] object-contain rounded-xl shadow-lg border border-gray-200 transition-opacity duration-500"
            style={{ objectPosition: 'center' }}
          />
        </div>
      )}
      {product.handle === "small-bamboo-flower-pot-with-stand-stylish-indoor-artificial-pot" && (
        <div className="w-full flex justify-center bg-white pt-6 pb-2">
          <img
            src={["https://cdn.shopify.com/s/files/1/0605/7974/1763/files/13_95a2bf96-f58a-4587-862e-1d0b56fb5b21.png?v=1744532370","https://cdn.shopify.com/s/files/1/0605/7974/1763/files/12_8843d7d3-1909-4806-9a81-c201189113eb.png?v=1744532287"][bannerImageIndex % 2]}
            alt={`Product Banner ${bannerImageIndex + 1}`}
            className="w-full max-w-6xl h-auto max-h-[500px] object-contain rounded-xl shadow-lg border border-gray-200 transition-opacity duration-500"
            style={{ objectPosition: 'center' }}
          />
        </div>
      )}
      {product.handle === "1-unique-bamboo-wall-hanging-affordable-home-wall-art-decor-in-small-sizes-for-living-areas" && (
        <div className="w-full flex justify-center bg-white pt-6 pb-2">
          <img
            src={["https://cdn.shopify.com/s/files/1/0605/7974/1763/files/Untitled_design_6_94ceb65e-b8c9-4128-b800-9173ba5feaa0.png?v=1744435517","https://cdn.shopify.com/s/files/1/0605/7974/1763/files/8_0a80f77e-9933-4cf1-aed1-5a8d5da34a38.png?v=1743162714"][bannerImageIndex % 2]}
            alt={`Product Banner ${bannerImageIndex + 1}`}
            className="w-full max-w-6xl h-auto max-h-[500px] object-contain rounded-xl shadow-lg border border-gray-200 transition-opacity duration-500"
            style={{ objectPosition: 'center' }}
          />
        </div>
      )}
      {product.handle === "small-bamboo-hanging-with-stand-stylish-home-wall-art-decor" && (
        <div className="w-full flex justify-center bg-white pt-6 pb-2">
          <img
            src={["https://cdn.shopify.com/s/files/1/0605/7974/1763/files/11_4b7b2887-7c74-4d79-9e97-4fdc85bd90ce.png?v=1743659676","https://cdn.shopify.com/s/files/1/0605/7974/1763/files/10_08f6a637-e80b-47a1-b610-5772f9cd6db0.png?v=1744431063"][bannerImageIndex % 2]}
            alt={`Product Banner ${bannerImageIndex + 1}`}
            className="w-full max-w-6xl h-auto max-h-[500px] object-contain rounded-xl shadow-lg border border-gray-200 transition-opacity duration-500"
            style={{ objectPosition: 'center' }}
          />
        </div>
      )}
      {/* Steps Timeline (DynamicTutorialSection) and DownloadGuide for the 4 special products */}

      {/* Main Product Detail Section */}
      <div className="w-full max-w-7xl  mx-auto px-2 sm:px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Left - ImageSlider */}
        <ImageSlider
          images={productData.images}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />

        {/* Right - Product Info */}
        <div className="flex flex-col space-y-4">
          {/* Title */}
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#000000] font-albert leading-tight">
            {productData.title}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            <div className="flex text-[#000000] text-base sm:text-lg">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <span key={i}>★</span>
                ))}
            </div>
            <p className="text-sm sm:text-base text-black">{productData.ratings}</p>
          </div>

          {/* Note */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-red-500 text-lg">⚡</span>
            <p className="text-lg sm:text-[24px] text-[#000000] font-jost">{productData.note}</p>
          </div>

          {/* Price Block */}
          <div className="flex flex-wrap items-center gap-4 text-lg sm:text-xl font-bold text-[#000000] font-albert">
            <span>{productData.price}</span>
            <span className="line-through text-gray-400">{productData.originalPrice}</span>
            <span className="bg-[#0167FF] text-white text-xs px-2 py-1 rounded-lg">
              {productData.discount}
            </span>
          </div>

          {/* Delivery Info */}
          <p className="text-sm sm:text-md text-gray-600 flex items-center gap-2">
            <FaShippingFast className="text-black" />
            {productData.deliveryEstimate}
          </p>

          {/* Color Selector */}
          <div>
            <h2 className="font-albert mb-2 text-sm text-black sm:text-base font-semibold">Color</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {productData.variants.map((variant: any, index: number) => (
                <img
                  key={index}
                  src={variant.image}
                  alt={variant.color}
                  title={variant.color}
                  onClick={() => handleColorClick(variant)}
                  className={`w-10 h-10 object-cover rounded-full border-2 cursor-pointer ${
                    variant.color === selectedVariant?.color
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-700">{selectedVariant?.color}</p>

            {/* Add to Cart Component */}
            <AddToCart product={productData} selectedVariant={selectedVariant} />
          </div>
          
        </div>
      </div>
      {["large-bamboo-standing-plant-pot-unique-affordable", "small-bamboo-flower-pot-with-stand-stylish-indoor-artificial-pot", "1-unique-bamboo-wall-hanging-affordable-home-wall-art-decor-in-small-sizes-for-living-areas", "small-bamboo-hanging-with-stand-stylish-home-wall-art-decor"].includes(product.handle) && (
        <>
          <DynamicTutorialSection productHandle={product.handle} productTitle={product.title} />
          
        </>
      )}
      
      {/* Text Slider */}
      <TextSlider />


      {/* Accordion Section */}
      <Accordion />


      {/* Related Products Section */}
      <RelatedProducts currentProduct={product} />

     

      {/* Additional Sections */}
      <PromoBanner />
      <Reviews />
      <FAQSection />
      <FSlider />
      <FeatureHighlights />
    </div>
  );
} 