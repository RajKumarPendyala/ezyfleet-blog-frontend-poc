// src/app/blog/[slug]/page.tsx
import { fetchAPI } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

interface Post {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: any[];
  author: string;
  publishedAt: string;
  seo?: {
    seoTitle: string;
    seoDescription: string;
  };
  featuredImage?: {
    url: string;
    alternativeText: string | null;
  };
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

/* ---------------- Static Params ---------------- */
export async function generateStaticParams() {
  try {
    const { data: posts } = await fetchAPI('posts', {
      fields: ['slug'],
      pagination: {
        limit: 100, // Adjust based on your needs
      },
    });

    return posts.map((post: Post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/* ---------------- Metadata ---------------- */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  try {
    const { slug } = await params;

    const { data: posts } = await fetchAPI('posts', {
      filters: { 
        slug: {
          $eq: slug
        }
      },
      populate: {
        featuredImage: {
          fields: ['url', 'alternativeText']
        },
        seo: {
          fields: ['seoTitle', 'seoDescription']
        }
      },
    });

    if (!posts || posts.length === 0) {
      return {
        title: 'Post Not Found',
      };
    }

    const post: Post = posts[0];

    return {
      title: post.seo?.seoTitle || post.title,
      description: post.seo?.seoDescription || `Read ${post.title} by ${post.author}`,
      openGraph: {
        title: post.seo?.seoTitle || post.title,
        description: post.seo?.seoDescription,
        images: post.featuredImage?.url
          ? [
              {
                url: post.featuredImage.url,
                alt: post.featuredImage.alternativeText || post.title,
              },
            ]
          : [],
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.seo?.seoTitle || post.title,
        description: post.seo?.seoDescription,
        images: post.featuredImage?.url ? [post.featuredImage.url] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'EzyFleet Blog',
    };
  }
}

/* ---------------- Page ---------------- */
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;

    const { data: posts } = await fetchAPI('posts', {
      filters: { 
        slug: {
          $eq: slug
        }
      },
      populate: {
        featuredImage: {
          fields: ['url', 'alternativeText']
        },
        seo: {
          fields: ['seoTitle', 'seoDescription']
        }
      },
    });

    if (!posts || posts.length === 0) {
      notFound();
    }

    const post: Post = posts[0];

    return (
      <article className="container mx-auto p-4 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Back to all posts
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

        {/* Meta Information */}
        <div className="flex items-center text-gray-600 text-sm mb-8 pb-8 border-b">
          <span className="font-medium">{post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        {/* Featured Image */}
        {post.featuredImage?.url && (
          <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alternativeText || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}

        {/* Rich Text Content */}
        <div className="prose prose-lg prose-blue max-w-none">
          {post.content && post.content.length > 0 ? (
            <BlocksRenderer content={post.content} />
          ) : (
            <p className="text-gray-500 italic">No content available.</p>
          )}
        </div>

        {/* Back to Home Link */}
        <div className="mt-12 pt-8 border-t">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    notFound();
  }
}
