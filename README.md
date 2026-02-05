# EzyFleet Blog Frontend - Fixed Version

This is the corrected version of your Next.js blog frontend that connects to your Strapi backend.

## 🐛 Issues Fixed

### 1. **Wrong Layout File Location**
- **Problem**: `layout.tsx` was actually a blog post page, not a root layout
- **Fix**: Created proper root layout at `src/app/layout.tsx` with header and footer

### 2. **API Query String Serialization**
- **Problem**: Nested objects (filters, populate) weren't properly serialized, causing 400 errors
- **Fix**: Used `qs` library to properly serialize complex query parameters

### 3. **Next.js 15+ Params Handling**
- **Problem**: `params` weren't awaited, causing TypeScript errors in deployment
- **Fix**: Changed `params: { slug: string }` to `params: Promise<{ slug: string }>` and added `await`

### 4. **Missing ISR Configuration**
- **Problem**: No revalidation, content wouldn't update
- **Fix**: Added `export const revalidate = 60` to enable ISR with 60-second revalidation

### 5. **Image Domain Configuration**
- **Problem**: External images from Strapi weren't allowed
- **Fix**: Added `remotePatterns` in `next.config.ts` for Strapi domains

### 6. **Better Error Handling**
- **Problem**: Poor error messages, hard to debug
- **Fix**: Added comprehensive try-catch blocks with detailed logging

### 7. **Strapi v5 Data Structure**
- **Problem**: Code assumed old Strapi v4 structure with nested `data.attributes`
- **Fix**: Updated to handle Strapi v5 flat structure where data is directly accessible

## 📁 File Structure

```
ezyfleet-blog-frontend-poc/
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual blog post page
│   │   ├── layout.tsx                # Root layout (NEW - FIXED)
│   │   ├── page.tsx                  # Home page with post list
│   │   ├── not-found.tsx             # Custom 404 page
│   │   └── globals.css               # Global styles
│   └── lib/
│       └── api.ts                    # API utility (FIXED)
├── next.config.ts                    # Next.js config (FIXED)
├── package.json
└── .env.local                        # Environment variables
```

## 🚀 Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create `.env.local`

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_STRAPI_API_URL=https://wonderful-kindness-cbe166af41.strapiapp.com/api
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 🌐 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Fixed Next.js frontend for Strapi blog"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables

In Vercel project settings:

- **Name**: `NEXT_PUBLIC_STRAPI_API_URL`
- **Value**: `https://wonderful-kindness-cbe166af41.strapiapp.com/api`

### Step 4: Deploy

Click "Deploy" and wait for build to complete.

## 🔄 ISR (Incremental Static Regeneration)

Your site now uses ISR with the following configuration:

- **Revalidation Time**: 60 seconds
- **How it works**: 
  - Pages are statically generated at build time
  - After 60 seconds, the next request triggers a background regeneration
  - Users always see fast static pages
  - Content updates automatically every 60 seconds

### To adjust revalidation time:

In `src/app/page.tsx` and `src/app/blog/[slug]/page.tsx`, change:

```typescript
export const revalidate = 60; // Change to your preferred seconds
```

## 📝 API Query Examples

### Fetch all posts with specific fields:

```typescript
const { data } = await fetchAPI('posts', {
  fields: ['title', 'slug', 'author'],
  populate: {
    featuredImage: {
      fields: ['url', 'alternativeText']
    }
  },
  sort: ['publishedAt:desc'],
  pagination: {
    page: 1,
    pageSize: 10,
  }
});
```

### Filter posts by slug:

```typescript
const { data } = await fetchAPI('posts', {
  filters: {
    slug: {
      $eq: 'my-post-slug'
    }
  },
  populate: '*'
});
```

## 🎨 Customization

### Change Header/Footer

Edit `src/app/layout.tsx`

### Modify Post Card Design

Edit `src/app/page.tsx` - the grid section

### Change Blog Post Layout

Edit `src/app/blog/[slug]/page.tsx`

## 🔧 Troubleshooting

### "Failed to load posts"

1. Check if Strapi backend is running
2. Verify `NEXT_PUBLIC_STRAPI_API_URL` is correct
3. Check browser console and terminal for error details

### Images not loading

1. Verify image URLs in Strapi
2. Check `next.config.ts` has correct domain patterns
3. Check if images are published in Strapi

### Build errors on Vercel

1. Make sure all environment variables are set
2. Check build logs for specific errors
3. Verify TypeScript has no errors locally: `npm run build`

## 📚 Key Changes Summary

| File | Change | Why |
|------|--------|-----|
| `src/app/layout.tsx` | Created root layout | Was missing, causing deployment error |
| `src/lib/api.ts` | Added `qs` for serialization | Fixes 400 errors with complex queries |
| `src/app/blog/[slug]/page.tsx` | `await params` | Next.js 15+ requirement |
| `next.config.ts` | Added image domains | Allows external Strapi images |
| All pages | Added `revalidate` export | Enables ISR for auto-updates |

## 🎯 Testing Checklist

- [ ] Home page loads with all posts
- [ ] Click on a post navigates to detail page
- [ ] Images load correctly
- [ ] Back button works
- [ ] 404 page shows for invalid slugs
- [ ] Mobile responsive design works
- [ ] New posts appear after 60 seconds

## 📞 Support

If you encounter issues:

1. Check the browser console (F12)
2. Check terminal/Vercel logs
3. Verify Strapi backend is accessible
4. Ensure environment variables are set correctly

---

**Note**: This frontend is configured to work with your existing Strapi backend at `https://wonderful-kindness-cbe166af41.strapiapp.com`
