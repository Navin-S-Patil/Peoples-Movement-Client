// EPaper.js
'use client';
import React from "react";
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[50vh] p-4">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  )
});

const EPaper = () => {
  const pdfPath = "/samplePDFs/pdf.pdf";

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">E-Paper</h1>
      <PDFViewer url={pdfPath} />
    </div>
  );
};

export default EPaper;