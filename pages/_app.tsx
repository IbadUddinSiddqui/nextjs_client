import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ProductDetail from "../components/ProductDetail";
import VideoPlayer from "../components/VideoPlayer";
import StepTutorial from "../components/StepTutorial";
import PromoBanner from "../components/PromoBanner";
import Reviews from "../components/Reviews";
import FAQSection from "../components/FAQ";
import FSlider from "../components/FSlider";
import FeatureHighlights from "../components/FeatureHighlights";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      
      <ProductDetail />
      <VideoPlayer />
      <StepTutorial />
      <PromoBanner />
      <Reviews />
      <FAQSection />
      <FSlider />
      <FeatureHighlights />
    </div>
  );
}
