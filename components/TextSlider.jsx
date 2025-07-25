import React from "react";

const TextSlider = () => {
  const textItems = [
    "Off Indoor Plant Pots 15%",
    "Style Your Room with Ease",
    "Best Pots at Best Prices",
    "Nationwide Delivery Included",
    "!Order Big Pots Today",
    "Free Delivery Across Pakistan",
  ];

  const renderTextWithIcons = () =>
    textItems.map((text, index) => (
      <div className="text-slide text-black font-bold italic" key={index}>
        <span className="-ml-2">{text}</span>
        <div className="w-[30px] p-0 -m-2">
        {index < textItems.length - 1 && (
          <img
            src="/images/s-shine.png"
            alt="shine"
            className="icon "
            style={{ filter: 'brightness(0) saturate(100%)' }}
          />
        )}</div>
      </div>
    ));

  return (
    <div className="text-slider-wrapper bg-white">
      <div className="text-slider-track">
        {renderTextWithIcons()}
        {renderTextWithIcons()} {/* 👈 Duplicate for smooth loop */}
      </div>
    </div>
  );
};

export default TextSlider;
