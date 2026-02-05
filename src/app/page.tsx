// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { fetchAPI } from '@/lib/api';

interface Post {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: {
    type: string;
    children: { text: string }[];
  }[];
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

export default async function Home() {
  try {
    const { data: posts } = await fetchAPI('posts', {
      sort: ['publishedAt:desc'],
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
      return (
        <main className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-8 text-center">
            EzyFleet Blog
          </h1>
          <p className="text-center text-gray-600">No posts available yet.</p>
        </main>
      );
    }

    return (
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          EzyFleet-Blog
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <div
              key={post.id}
              className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Featured Image (optional) */}
              {post.featuredImage?.url && (
                <div className="relative w-full h-48">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alternativeText || post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              <div className="p-4">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-600 text-sm mb-3">
                  By {post.author} ·{' '}
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-500 hover:underline inline-block"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading posts:', error);
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          EzyFleet Blog
        </h1>
        <p className="text-center text-red-600">
          Failed to load posts. Please check your API connection.
        </p>
      </main>
    );
  }
}
