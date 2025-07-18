import React, { useEffect, useRef, useState } from "react";

const messages = [
  "Welcome to ECO Bambo !",
  "30% off on bamboo flower pot - order now !",
  "Free delivery in Pakistan",
  "New style bamboo arrivals"
];

const SLIDE_DURATION = 3000; // ms (total time for each message)

export default function HeaderAnnouncementSlider() {
  const [current, setCurrent] = useState(0);
  const spanRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, SLIDE_DURATION);
    // Restart animation by reflowing the span
    if (spanRef.current) {
      spanRef.current.style.animation = 'none';
      // Force reflow
      void spanRef.current.offsetWidth;
      spanRef.current.style.animation = `slideInOut ${SLIDE_DURATION}ms linear`;
    }
    return () => clearTimeout(timeout);
  }, [current]);

  return (
    <div className="w-full h-8 flex items-center justify-center overflow-hidden relative">
      <span
        ref={spanRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-semibold"
        style={{
          color: "#000",
          fontWeight: 350,
          fontSize: "1rem",
          letterSpacing: "0.02em",
          minWidth: 'max-content',
          animation: `slideInOut ${SLIDE_DURATION}ms linear`,
        }}
      >
        {messages[current]}
      </span>
      <style jsx>{`
        @keyframes slideInOut {
          0% {
            transform: translate(-50%, -50%) translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          20% {
            transform: translate(-50%, -50%) translateX(-10%);
            opacity: 1;
          }
          80% {
            transform: translate(-50%, -50%) translateX(-10%);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
} 