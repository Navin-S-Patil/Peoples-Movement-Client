'use client'
import NewsBlogDetail from '../../components/NewsBlogDetails';
import { useParams } from 'next/navigation';

export default function NewsPage() {
  const params = useParams();
  return <NewsBlogDetail newsId={params.newsId} />;
}