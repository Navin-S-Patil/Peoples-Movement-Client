// app/e-paper/[pdfId]/page.js
'use client';
import React from "react";
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[50vh] p-4">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  )
});

const EPaperView = () => {
  const params = useParams();
  
  // In real implementation, fetch PDF details based on pdfId
  // For now, using static path as in your example
  const pdfPath = "/samplePDFs/pdf.pdf";

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4">
      <div className="flex items-center mb-4">
        <Link href="/e-paper">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Archives
          </Button>
        </Link>
      </div>
      
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">E-Paper</h1>
      <PDFViewer url={pdfPath} />
    </div>
  );
};

export default EPaperView;