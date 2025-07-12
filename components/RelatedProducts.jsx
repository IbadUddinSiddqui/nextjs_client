import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { shopifyFetch } from "../lib/shopify";

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GraphQL query to fetch related products
  const RELATED_PRODUCTS_QUERY = `
    query GetRelatedProducts($first: Int!, $productType: String, $tags: [String!]) {
      products(first: $first, query: "product_type:'${currentProduct?.productType || ''}' OR tag:'${currentProduct?.tags?.[0] || ''}'") {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
            tags
            productType
          }
        }
      }
    }
  `;

  // Fetch related products
  useEffect(() => {
    if (!currentProduct) return;

    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        
        // First try to get products with same product type
        let query = `product_type:'${currentProduct.productType || ''}'`;
        
        // If no product type, try with tags
        if (!currentProduct.productType && currentProduct.tags?.length > 0) {
          query = `tag:'${currentProduct.tags[0]}'`;
        }

        const data = await shopifyFetch({
          query: `
            query GetRelatedProducts($first: Int!) {
              products(first: $first, query: "${query}") {
                edges {
                  node {
                    id
                    title
                    handle
                    description
                    images(first: 1) {
                      edges {
                        node {
                          src
                          altText
                        }
                      }
                    }
                    variants(first: 1) {
                      edges {
                        node {
                          priceV2 {
                            amount
                            currencyCode
                          }
                        }
                      }
                    }
                    tags
                    productType
                  }
                }
              }
            }
          `,
          variables: { first: 8 },
        });

        // Filter out the current product and transform data
        const fetchedProducts = data.products.edges
          .map(edge => ({
            id: edge.node.id,
            title: edge.node.title,
            handle: edge.node.handle,
            description: edge.node.description,
            image: edge.node.images.edges[0]?.node.src || "/images/placeholder.jpg",
            altText: edge.node.images.edges[0]?.node.altText || edge.node.title,
            price: edge.node.variants.edges[0]?.node.priceV2.amount || "N/A",
            currency: edge.node.variants.edges[0]?.node.priceV2.currencyCode || "",
            tags: edge.node.tags,
            productType: edge.node.productType
          }))
          .filter(product => product.id !== currentProduct.id)
          .slice(0, 4); // Limit to 4 related products

        setRelatedProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProduct]);

  if (loading) {
    return (
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Related Products</h2>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading related products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || relatedProducts.length === 0) {
    return null; // Don't show section if no related products
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Related Products
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href={`/products/${product.handle}`}>
                <div className="relative h-48 overflow-hidden group cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.altText}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/products/${product.handle}`}>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold text-green-600">
                    {product.currency} {product.price}
                  </p>
                  
                  {product.productType && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {product.productType}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts; 