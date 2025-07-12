# ECO BAMBO - Next.js Shopify Store

A modern, responsive e-commerce website built with Next.js and integrated with Shopify Storefront API. This project provides a custom frontend for the ECO BAMBO bamboo products store with dynamic product pages, tutorial content, and seamless Shopify integration.

## 🚀 Features

### Core Features
- **Dynamic Product Pages** - Real-time product data from Shopify
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **SEO Optimized** - Meta tags, structured data, and performance optimized
- **Fast Performance** - Next.js 14 with optimized loading and caching

### Product Features
- **Product Image Galleries** - Multiple image views with auto-rotation
- **Variant Selection** - Color and size selection with real-time updates
- **Tutorial Content** - Step-by-step assembly guides for specific products
- **Related Products** - Dynamic product recommendations
- **Social Sharing** - Integrated social media sharing

### Shopify Integration
- **Native Cart Integration** - Direct integration with Shopify cart
- **Real-time Inventory** - Live product availability and pricing
- **Secure Checkout** - Redirects to Shopify's secure checkout
- **Product Collections** - Dynamic category and collection pages

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **E-commerce**: Shopify Storefront API
- **Language**: TypeScript
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- A Shopify store with Storefront API access
- Shopify Storefront API token
- Shopify store domain

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs_client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
nextjs_client/
├── components/          # React components
│   ├── AddToCart.jsx   # Cart functionality
│   ├── ImageSlider.jsx # Product image gallery
│   ├── DynamicTutorialSection.jsx # Tutorial content
│   └── ...
├── pages/              # Next.js pages
│   ├── index.tsx       # Home page
│   ├── products/       # Product pages
│   └── checkout.tsx    # Checkout redirect
├── lib/                # Utility functions
│   └── shopify.js      # Shopify API client
├── styles/             # Global styles
├── public/             # Static assets
└── ...
```

## 🎯 Key Components

### Product Pages (`/products/[slug]`)
- Dynamic routing based on Shopify product handles
- Real-time product data fetching
- Image galleries with auto-rotation
- Variant selection and cart integration
- Tutorial content for specific products

### Add to Cart Integration
- Native Shopify cart integration
- Direct redirect to Shopify cart page
- Quantity selection
- Variant-specific cart additions

### Tutorial System
- Step-by-step assembly guides
- Video tutorials
- Interactive step navigation
- Product-specific tutorial content

## 🔧 Configuration

### Shopify Setup
1. Enable Storefront API in your Shopify admin
2. Generate a Storefront access token
3. Update environment variables with your store details

### Customization
- **Styling**: Modify Tailwind classes in components
- **Products**: Update product queries in `lib/shopify.js`
- **Tutorials**: Edit tutorial data in `components/DynamicTutorialSection.jsx`

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Configure build settings for Next.js
- **AWS Amplify**: Use Next.js build configuration
- **Custom Server**: Build with `npm run build` and serve with `npm start`

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SHOPIFY_STORE_DOMAIN` | Your Shopify store domain | Yes |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token | Yes |

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for all metrics
- **Image Optimization**: Next.js automatic image optimization
- **Caching**: Built-in Next.js caching strategies

## 🛡️ Security

- **API Keys**: Securely stored in environment variables
- **CORS**: Properly configured for Shopify API
- **HTTPS**: Enforced in production
- **Input Validation**: All user inputs validated

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Email**: [your-email@domain.com]
- **Documentation**: [link-to-docs]
- **Issues**: [GitHub Issues](link-to-issues)

## 🙏 Acknowledgments

- Shopify for the Storefront API
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- All contributors and supporters

---

**Built with ❤️ for ECO BAMBO**
