'use client'
import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  // WhatsApp, nn  m d  
  Copy,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format, formatDistanceToNow } from 'date-fns';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { showToast } from "@/lib/toast";
import { useToast } from "@/hooks/use-toast"


const BlogDetailSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-3/4" /> {/* Title */}
    <div className="flex gap-4">
      <Skeleton className="h-6 w-32" /> {/* Date */}
      <Skeleton className="h-6 w-32" /> {/* Author */}
    </div>
    <Skeleton className="aspect-[21/9] w-full" /> {/* Main Image */}
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-6 w-16" /> /* Tags */
      ))}
    </div>
    {[1, 2, 3, 4].map((i) => (
      <Skeleton key={i} className="h-4 w-full" /> /* Content */
    ))}
  </div>
);

const NewsBlogDetail = ({ newsId }) => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  // Simulate data fetching
  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Mock data for demonstration
        setBlog({
          newsId: "news-1",
          title: "Sample Detailed Blog Post",
          summary: "A comprehensive look at the latest developments in technology and their impact on society.",
          content: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <h2>Key Points</h2>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <ul>
              <li>Point 1: Important information</li>
              <li>Point 2: Critical analysis</li>
              <li>Point 3: Future implications</li>
            </ul>
            <h2>Analysis</h2>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <blockquote>
              Notable quote or excerpt from the article that deserves emphasis and attention.
            </blockquote>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          `,
          author: "John Doe",
          publishDate: new Date().toISOString(),
          tags: ["Technology", "Innovation", "Future"],
          coverImage: {
            imageId: "img-1",
            signedUrl: "/api/placeholder/800/400"
          },
          images: [
            {
              imageId: "img-2",
              description: "Additional image 1",
              signedUrl: "/api/placeholder/800/400"
            },
            {
              imageId: "img-3",
              description: "Additional image 2",
              signedUrl: "/api/placeholder/800/400"
            }
          ],
          status: "published",
          lastUpdated: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [newsId]);

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = blog?.title;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      // case 'whatsapp':
      //   window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title)} ${encodeURIComponent(url)}`, '_blank');
      //   break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          showToast.success("The article link has been copied to your clipboard.");
        } catch (err) {
          showToast.error("Could not copy the link to your clipboard.");
          console.error('Failed to copy:', err);
        }
        break;
    }
  };

  const handleImageNavigation = (direction) => {
    const allImages = [blog.coverImage, ...blog.images];
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <BlogDetailSkeleton />
      </div>
    );
  }

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  const allImages = [blog.coverImage, ...blog.images];

  return (
    <article className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Back button */}
      <Link href="/news" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to News
      </Link>

      {/* Article Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {blog.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{format(new Date(blog.publishDate), 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Updated {formatDistanceToNow(new Date(blog.lastUpdated), { addSuffix: true })}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag, index) => (
            <Badge 
              key={index}
              variant="secondary"
              className="hover:bg-secondary/80"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      <Card className="mb-8">
        <div className="relative aspect-[21/9] overflow-hidden">
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <Image
              src={allImages[currentImageIndex].signedUrl}
              alt={allImages[currentImageIndex].description || blog.title}
              fill
              className="object-cover"
              priority
            />
          </Suspense>
          
          {allImages.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
                onClick={() => handleImageNavigation('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
                onClick={() => handleImageNavigation('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        <CardContent className="p-4 text-sm text-gray-500 text-center">
          {allImages[currentImageIndex].description || blog.title}
        </CardContent>
      </Card>

      {/* Share Button */}
      <div className="flex justify-end mb-6">
        <TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleShare('facebook')}>
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('twitter')}>
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('linkedin')}>
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
                <WhatsApp className="w-4 h-4 mr-2" />
                WhatsApp
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => handleShare('copy')}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>
      </div>

      {/* Article Content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};

export default NewsBlogDetail;