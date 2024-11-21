"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data - replace with API call later
const mockNewspapers = [
  {
    pdfId: "pdf-001",
    name: "Daily News - Morning Edition",
    date: "2024-11-12T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-001",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-002",
    name: "Evening Chronicle",
    date: "2024-11-11T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-002",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-003",
    name: "Weekend Special Edition",
    date: "2024-11-10T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-003",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-004",
    name: "Business Weekly Digest",
    date: "2024-11-09T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-004",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-005",
    name: "Sports Special Coverage",
    date: "2024-11-08T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-005",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-006",
    name: "Technology Today",
    date: "2024-11-07T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-006",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-007",
    name: "Entertainment Weekly",
    date: "2024-11-06T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-007",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-008",
    name: "Health & Wellness Report",
    date: "2024-11-05T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-008",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-009",
    name: "Science Digest",
    date: "2024-11-04T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-009",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-010",
    name: "Education Times",
    date: "2024-11-03T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-010",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-011",
    name: "Fashion & Lifestyle",
    date: "2024-11-02T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-011",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-012",
    name: "Real Estate Review",
    date: "2024-11-01T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-012",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-013",
    name: "Food & Dining Guide",
    date: "2024-10-31T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-013",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-014",
    name: "Travel Explorer",
    date: "2024-10-30T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-014",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-015",
    name: "Arts & Culture Weekly",
    date: "2024-10-29T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-015",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-016",
    name: "Arts & Culture Weekly",
    date: "2024-10-29T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-015",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-017",
    name: "Arts & Culture Weekly",
    date: "2024-10-29T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-015",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-018",
    name: "Arts & Culture Weekly",
    date: "2024-10-29T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-015",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-019",
    name: "Arts & Culture Weekly",
    date: "2024-10-29T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-015",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
  {
    pdfId: "pdf-20",
    name: "Arts & Culture Weekly",
    date: "2024-10-29T00:00:00Z",
    pdfUrl: "/samplePDFs/pdf.pdf",
    thumbnail: {
      thumbnailId: "thumb-015",
      thumbnailUrl: "/api/placeholder/200/280",
    },
  },
];

// Loading skeleton for newspaper card
const NewspaperCardSkeleton = () => (
  <Card className="overflow-hidden">
    <div className="space-y-3">
      <Skeleton className="aspect-[3/2] w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </div>
  </Card>
);

const NewsPaperList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [newspapers, setNewspapers] = useState([]);
  const itemsPerPage = 9;

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Replace this with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
        setNewspapers(mockNewspapers);
      } catch (error) {
        console.error("Error fetching newspapers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Add any dependencies if needed

  // Calculate total pages
  const totalItems = newspapers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newspapers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(itemsPerPage)].map((_, index) => (
            <NewspaperCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">News Archives</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((paper) => (
          <Card
            key={paper.pdfId}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <Link href={`/e-paper/${paper.pdfId}`}>
              <div className="cursor-pointer">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Suspense fallback={<Skeleton className="w-full h-full" />}>
                    <Image
                      src={paper.thumbnail.thumbnailUrl}
                      alt={`${paper.name} thumbnail`}
                      fill
                      loading="lazy"
                      className="object-cover transform transition-transform duration-300 hover:scale-105"
                    />
                  </Suspense>
                </div>

                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                    {paper.name}
                  </h2>

                  <div className="flex items-center text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {format(new Date(paper.date), "MMMM d, yyyy")}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group hover:bg-primary hover:text-primary-foreground"
                  >
                    <Eye className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    Read E-Paper
                  </Button>
                </CardContent>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {getPageNumbers().map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? "default" : "outline"}
              onClick={() => handlePageChange(pageNumber)}
              className="w-10 h-10"
            >
              {pageNumber}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Items per page indicator */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)}{" "}
        of {totalItems} items
      </div>
    </div>
  );
};

export default NewsPaperList;
