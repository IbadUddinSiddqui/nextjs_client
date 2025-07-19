import React, { useState } from "react";
import {
  FaMinus,
  FaPlus,
  FaTimes,
  FaShareAlt,
  FaShoppingCart,
  FaShoppingBag,
  FaTruck,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaShieldAlt,
  FaYoutube,
} from "react-icons/fa";

const SHOPIFY_DOMAIN = "ecobambo.com";

const AddToCart = ({ product, selectedVariant }) => {
  const [quantity, setQuantity] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert('Please select a variant first');
      return;
    }
    
    if (!selectedVariant.id) {
      alert('Variant information is missing. Please try refreshing the page.');
      return;
    }
    
    try {
      // Shopify variant ID is the last part after 'gid://shopify/ProductVariant/'
      const shopifyVariantId = selectedVariant.id.split('/').pop();
      if (!shopifyVariantId) {
        alert('Invalid variant ID. Please try refreshing the page.');
        return;
      }
      const cartUrl = `https://${SHOPIFY_DOMAIN}/cart/${shopifyVariantId}:${quantity}`;
      window.location.href = cartUrl;
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart. Please try again.');
    }
  };

  const handleOrderNow = handleAddToCart;

  return (
    <>
      <div className="space-y-6 mt-4">
        {/* Quantity Selector */}
        <div>
          <label className="font-albert text-black text-lg mb-2 block">Quantity</label>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDecrease}
              className="bg-white text-black font-albert p-2 rounded hover:bg-gray-300"
            >
              <FaMinus size={14} />
            </button>
            <span className="text-lg text-black font-albert">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="bg-white text-black font-albert p-2 rounded hover:bg-gray-300"
            >
              <FaPlus size={14} />
            </button>
          </div>
        </div>

        {/* Add to Cart & Order Now Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <button 
            onClick={handleAddToCart}
            className="bg-black text-[rgb(184,134,11,1)] py-3 px-4 hover:text-white rounded flex items-center justify-center gap-2 w-full transition-transform duration-200 hover:scale-105"
          >
            <FaShoppingCart />
            Add to Cart
          </button>

          <button 
            onClick={handleOrderNow}
            className="border border-[rgb(184,134,11,1)] bg-black hover:text-white text-[rgb(184,134,11,1)] py-4 px-6 rounded flex items-center justify-center gap-2 w-full animate-bounce text-lg font-bold shadow-lg"
          >
            <FaShoppingBag />
            Order Now
          </button>
        </div>

        {/* Pickup Info */}
        <div className="text-sm text-black flex items-start gap-2">
          <span className="text-green-600 text-lg">✔</span>
          <div>
            <p>
              <strong>Pickup available at Eco Bamboo.</strong>
              <br />
              Usually ready in 24 hours
            </p>
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-black underline mt-1 inline-block"
            >
              View store information
            </button>
          </div>
        </div>

        {/* Delivery & Return + Share Button */}
        <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
          <button
            onClick={() => setPolicyOpen(true)}
            className="text-black font-semibold underline text-sm flex items-center gap-2"
          >
            <FaTruck />
            Delivery & Return
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowShare(!showShare)}
              className="flex items-center gap-2 p-2 text-black rounded-full hover:bg-gray-300"
            >
              <FaShareAlt />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Social Icons Row */}
        <div className="flex items-center gap-4 mt-4 mb-2">
          <span className="text-black font-semibold mr-2">Share</span>
          <a href="https://www.facebook.com/share/1EVwQs5T9X/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center justify-center w-9 h-9 rounded-full bg-black hover:opacity-80">
            <svg className="w-5 h-5" fill="white" viewBox="0 0 20 20"><path d="M18 10.049C18 5.603 14.419 2 10 2s-8 3.603-8 8.049C2 14.067 4.925 17.396 8.75 18v-5.624H6.719v-2.328h2.03V8.275c0-2.017 1.195-3.132 3.023-3.132.874 0 1.79.158 1.79.158v1.98h-1.009c-.994 0-1.303.621-1.303 1.258v1.51h2.219l-.355 2.326H11.25V18c3.825-.604 6.75-3.933 6.75-7.951"></path></svg>
          </a>
          <a href="https://www.instagram.com/ecobambo0?igsh=a3dpZ3NiY2R6d3Uw&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center justify-center w-9 h-9 rounded-full bg-black hover:opacity-80">
            <svg className="w-5 h-5" fill="white" viewBox="0 0 20 20"><path fillRule="evenodd" d="M13.23 3.492c-.84-.037-1.096-.046-3.23-.046-2.144 0-2.39.01-3.238.055-.776.027-1.195.164-1.487.273a2.4 2.4 0 0 0-.912.593 2.5 2.5 0 0 0-.602.922c-.11.282-.238.702-.274 1.486-.046.84-.046 1.095-.046 3.23s.01 2.39.046 3.229c.004.51.097 1.016.274 1.495.145.365.319.639.602.913.282.282.538.456.92.602.474.176.974.268 1.479.273.848.046 1.103.046 3.238.046s2.39-.01 3.23-.046c.784-.036 1.203-.164 1.486-.273.374-.146.648-.329.921-.602.283-.283.447-.548.602-.922.177-.476.27-.979.274-1.486.037-.84.046-1.095.046-3.23s-.01-2.39-.055-3.229c-.027-.784-.164-1.204-.274-1.495a2.4 2.4 0 0 0-.593-.913 2.6 2.6 0 0 0-.92-.602c-.284-.11-.703-.237-1.488-.273ZM6.697 2.05c.857-.036 1.131-.045 3.302-.045a63 63 0 0 1 3.302.045c.664.014 1.321.14 1.943.374a4 4 0 0 1 1.414.922c.41.397.728.88.93 1.414.23.622.354 1.279.365 1.942C18 7.56 18 7.824 18 10.005c0 2.17-.01 2.444-.046 3.292-.036.858-.173 1.442-.374 1.943-.2.53-.474.976-.92 1.423a3.9 3.9 0 0 1-1.415.922c-.51.191-1.095.337-1.943.374-.857.036-1.122.045-3.302.045-2.171 0-2.445-.009-3.302-.055-.849-.027-1.432-.164-1.943-.364a4.15 4.15 0 0 1-1.414-.922 4.1 4.1 0 0 1-.93-1.423c-.183-.51-.329-1.085-.365-1.943C2.009 12.45 2 12.167 2 10.004c0-2.161 0-2.435.055-3.302.027-.848.164-1.432.365-1.942a4.4 4.4 0 0 1 .92-1.414 4.2 4.2 0 0 1 1.415-.93c.51-.183 1.094-.33 1.943-.366Zm.427 4.806a4.105 4.105 0 1 1 5.805 5.805 4.105 4.105 0 0 1-5.805-5.805m1.882 5.371a2.668 2.668 0 1 0 2.042-4.93 2.668 2.668 0 0 0-2.042 4.93m5.922-5.942a.958.958 0 1 1-1.355-1.355.958.958 0 0 1 1.355 1.355" clipRule="evenodd" /></svg>
          </a>
          <a href="https://www.tiktok.com/@ecobambo0?_t=ZS-8uYnW51R4Sb&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex items-center justify-center w-9 h-9 rounded-full bg-black hover:opacity-80">
            <svg className="w-5 h-5" fill="white" viewBox="0 0 20 20"><path d="M10.511 1.705h2.74s-.157 3.51 3.795 3.768v2.711s-2.114.129-3.796-1.158l.028 5.606A5.073 5.073 0 1 1 8.213 7.56h.708v2.785a2.298 2.298 0 1 0 1.618 2.205z"></path></svg>
          </a>
          <a href="https://www.youtube.com/channel/UCMEfaztIY2KxW6fFh_J8zmw" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex items-center justify-center w-9 h-9 rounded-full bg-black hover:opacity-80">
            <svg className="w-5 h-5" fill="white" viewBox="0 0 20 20"><path d="M18.16 5.87c.34 1.309.34 4.08.34 4.08s0 2.771-.34 4.08a2.13 2.13 0 0 1-1.53 1.53c-1.309.34-6.63.34-6.63.34s-5.321 0-6.63-.34a2.13 2.13 0 0 1-1.53-1.53c-.34-1.309-.34-4.08-.34-4.08s0-2.771.34-4.08a2.17 2.17 0 0 1 1.53-1.53C4.679 4 10 4 10 4s5.321 0 6.63.34a2.17 2.17 0 0 1 1.53 1.53M8.3 12.5l4.42-2.55L8.3 7.4z"></path></svg>
          </a>
        </div>
 
        {/* Guarantee Safe Checkout */}
        <div className="flex flex-wrap items-center justify-between rounded-md px-4 py-3 mt-4 ">
          <div className="flex items-center gap-2">
            <span className="text-green-600 text-lg">
              <FaShieldAlt />
            </span>
            <span className="text-sm font-medium text-gray-800">
              Guarantee Safe Checkout
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            {[1, 2, 3, 4, 5].map((n) => (
              <img
                key={n}
                src={`/images/cash${n}.png`}
                alt={`cash${n}`}
                className="w-8 h-6 object-contain"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar for Store Info */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-[350px] bg-white shadow-xl p-6 z-50">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-lg text-black font-semibold mb-4">{product.title}</h2>
            <p className="mb-2 text-black text-sm">
              <strong>Color:</strong> {selectedVariant.color}
            </p>
            <h3 className="font-semibold text-black mb-2">Eco Bamboo</h3>
            <p className="text-sm text-black mb-1">
              Pickup available, usually text- ready in 24 hours
            </p>
            <p className="text-sm leading-relaxed text-black">
              Eco Bamboo
              <br />
              Karkhane wali abadi, Near PSO Pump Petrol,
              <br />
              Nazd Ali Niaz Sweet, Chakian, Phularwan
              <br />
              Bhalwal 40410
              <br />
              Pakistan
              <br />
              <br />
              <strong>Phone:</strong> +92 347 8237147
            </p>
          </div>
        </div>
      )
      }

      {/* Delivery & Return Modal */}
      {policyOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center px-4">
          <div className="relative bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-black"
              onClick={() => setPolicyOpen(false)}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl text-black font-albert font-bold mb-4">Returns & Exchanges Policy</h2>
            <p className="text-sm text-black font-jost leading-relaxed whitespace-pre-wrap">
              {/* 📝 Your full return policy text goes here */}
At Eco Bamboo, we are committed to providing high-quality, eco-friendly products. If you are not satisfied with your purchase, you can request a return or refund based on the conditions outlined below.
1. Return Policy
We offer a flexible return policy for both domestic and international orders:
Pakistan Orders: Returns must be requested within 7 to 14 days of receiving the product.
International Orders: Returns must be requested within 15 to 30 days of receiving the product.
Return Request Deadline:
You must initiate your return request within 2 to 3 days of receiving the order.
Requests submitted after 3 days will not be accepted.
Eligibility for Returns
To be eligible for a return, your item must:
Be unused, unworn, and in its original packaging
Include tags, accessories, and proof of purchase (receipt or order confirmation)
Be returned for one of the following valid reasons:
Damaged product received
Color difference from what was ordered
Size issue
Other solid reasons approved by our team
Return Proof Requirement: Customers must provide photo or video evidence of the issue before the return is approved.
How to Request a Return:
Email us at ecobambooarts@gmail.com with your order number and proof of the issue.
Return Address:
Bamboohandicrafts, Near PSO Petrol Pump Chakian, Shop Number 35, Karkhane Wali Abadi, Near Ali Niaz Sweet, Chakian, Karkhane Wali Abadi, Dakkhana Khas, Dhori, Tehsil Bhalwal, District Sargodha, Postal Code 40100, Phularwa 40410, Pakistan.
Important: Items sent back without prior approval will not be accepted.
2. Damages & Issues
Please inspect your order upon delivery. If your item is damaged, defective, or incorrect, contact us immediately at ecobambooarts@gmail.com or call us at +92 341 6995870 so we can resolve the issue.
3. Non-Returnable Items
Certain items cannot be returned, including:
Used or washed items
If you have any questions about the return eligibility of your item, please contact us before initiating a return.
4. Exchange Policy
If you need a different size or color, the fastest way to get the right product is to:
Request a return for your current item
Once approved, place a new order for the correct product
Exchanges will be processed only after we receive and inspect the returned item.
5. Refund Process
Once we receive and inspect your returned item, we will notify you about the refund approval status.
Approved Refunds: The amount will be refunded to your original payment method within 10 business days.
Processing Time: Some banks or credit card companies may take additional time to process the refund.
If 15 business days have passed since your refund was approved and you haven't received it, please contact us at ecobambooarts@gmail.com or call us at +92 341 6995870.
Need Help?
For any return or refund-related queries, feel free to contact us:
Email: ecobambooarts@gmail.com
Phone: +92 341 6995870
Return Address:
Bamboohandicrafts, Near PSO Petrol Pump Chakian, Shop Number 35, Karkhane Wali Abadi, Near Ali Niaz Sweet, Chakian, Karkhane Wali Abadi, Dakkhana Khas, Dhori, Tehsil Bhalwal, District Sargodha, Postal Code 40100, Phularwa 40410, Pakistan.
We are happy to assist you! </p>
          </div>
        </div>
      )
      }
    </>
  );
};

export default AddToCart;
