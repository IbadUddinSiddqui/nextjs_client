import React from "react";
import { ProductsGlider } from "@/components/ProductsGlider";
import RelatedProducts2 from "@/components/RelatedProducts2";
import RelatedProducts3 from "@/components/RelatedProducts3";
import ScrollReviews from "@/components/ScrollReviews";

import PromoBanner1 from "@/components/PromoBanner1";
import PromoBanner2 from "@/components/PromoBanner2";
// import FSlider1 from "@/components/FSlider1";


export default function ProductCarousel() {

  return (
    <div className="mt-36 ">
     
        <ProductsGlider></ProductsGlider>
      <div className="my-36">
      {/* <FSlider1></FSlider1> */}
        <RelatedProducts2></RelatedProducts2>
        <RelatedProducts3></RelatedProducts3>
        <PromoBanner1></PromoBanner1>
        <PromoBanner2></PromoBanner2>
        <ScrollReviews></ScrollReviews>
      </div>
    </div>
  );
}
