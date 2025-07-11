import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DownloadGuide = () => {
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = async () => {
    const element = containerRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/jpeg");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Guide.pdf");
  };

  return (
    <div className="text-center mt-12">
      {/* Hidden image for PDF generation */}
      <div
        ref={containerRef}
        style={{ visibility: "hidden", position: "absolute", top: "-9999px" }}
      >
        <img
          src="/images/guide.jpg"
          alt="Guide"
          style={{ width: "600px" }}
          crossOrigin="anonymous"
        />
      </div>

      {/* 📖 Read Urdu Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-block px-5 py-3 mb-5 text-[#B8860B] rounded-lg bg-black hover:text-black hover:bg-[#B8860B] font-bold"
      >
        👁️ Urdu ma read kare
      </button>
      <br />

      {/* 📥 Download Button */}
      <button
        onClick={handleDownload}
        className="px-5 py-3 bg-black text-[#B8860B] rounded-lg hover:text-black hover:bg-[#B8860B] transition font-bold"
      >
        📥 Download image
      </button>

      {/* ✅ Modal for Image Preview */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white p-4 rounded-lg shadow-xl max-w-[90vw] max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-black bg-gray-300 rounded-full p-1 hover:bg-black hover:text-white"
            >
              ✖
            </button>
            <img
              src="/images/guide.jpg"
              alt="Guide Preview"
              className="w-full h-auto max-h-[80vh] object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadGuide;
