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
      <div className="text-slide" key={index}>
        <span>{text}</span>
        {index < textItems.length - 1 && (
          <img
            src="/images/s-shine.png"
            alt="shine"
            className="icon"
          />
        )}
      </div>
    ));

  return (
    <div className="text-slider-wrapper">
      <div className="text-slider-track">
        {renderTextWithIcons()}
        {renderTextWithIcons()} {/* 👈 Duplicate for smooth loop */}
      </div>
    </div>
  );
};

export default TextSlider;
