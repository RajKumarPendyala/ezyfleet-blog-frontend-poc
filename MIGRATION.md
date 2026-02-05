# 🔄 Quick Migration Guide

## Replace Your Current Frontend

### Option 1: Replace Files Directly (Recommended)

1. **Backup your current code**:
```bash
cp -r ezyfleet-blog-frontend-poc ezyfleet-blog-frontend-poc-backup
```

2. **Replace key files** (in your existing project):

**Delete the wrong layout file**:
```bash
rm src/app/layout.tsx
```

**Copy these new/updated files**:
- `src/app/layout.tsx` (NEW - root layout)
- `src/app/page.tsx` (UPDATED)
- `src/app/blog/[slug]/page.tsx` (UPDATED)
- `src/app/not-found.tsx` (NEW)
- `src/app/loading.tsx` (NEW)
- `src/app/error.tsx` (NEW)
- `src/lib/api.ts` (UPDATED)
- `next.config.ts` (UPDATED)

### Option 2: Fresh Start

1. **Download the fixed version** (provided separately)
2. **Copy your `.env.local`** to the new project
3. **Install dependencies**:
```bash
npm install
```
4. **Test locally**:
```bash
npm run dev
```

---

## Quick Test Script

After replacing files, run this to verify everything works:

```bash
# 1. Clean install
rm -rf node_modules .next
npm install

# 2. Build test (catches most errors)
npm run build

# 3. Run locally
npm run dev
```

Then open http://localhost:3000 and check:
- ✅ Home page loads
- ✅ Posts display
- ✅ Click a post
- ✅ Images show
- ✅ No console errors

---

## What Changed - File by File

### `src/lib/api.ts`
**Line 12**: Changed from `new URLSearchParams()` to `qs.stringify()`
```typescript
// Before
const queryString = new URLSearchParams(mergedUrlParams as any).toString();

// After  
const queryString = qs.stringify(mergedUrlParams, {
    encodeValuesOnly: true,
});
```

### `src/app/layout.tsx`
**Entire file replaced** - This was a blog post, now it's a proper layout:
```typescript
// Now it accepts children and renders header/footer
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>...</header>
        <main>{children}</main>
        <footer>...</footer>
      </body>
    </html>
  );
}
```

### `src/app/blog/[slug]/page.tsx`
**Lines 43-44**: Added `Promise` type and `await`
```typescript
// Before
{ params }: { params: { slug: string } }
const slug = params.slug;

// After
{ params }: { params: Promise<{ slug: string }> }
const { slug } = await params;
```

**Line 1**: Added revalidation
```typescript
export const revalidate = 60;
```

### `src/app/page.tsx`
**Line 1**: Added revalidation
```typescript
export const revalidate = 60;
```

**Lines 30-40**: Updated data fetching with specific populate
```typescript
populate: {
  featuredImage: {
    fields: ['url', 'alternativeText']
  }
}
```

### `next.config.ts`
**Added**: Image configuration
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'wonderful-kindness-cbe166af41.strapiapp.com',
      pathname: '/uploads/**',
    },
  ],
},
```

---

## If You Get Errors After Migration

### Build Error: "Cannot find module..."
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Error: "params is not assignable"
Make sure you updated ALL instances of params in `blog/[slug]/page.tsx`:
- generateMetadata function
- Page component function
- Both need `Promise<{ slug: string }>`

### 400 API Errors Still Happening
1. Check `src/lib/api.ts` is using `qs.stringify()`
2. Verify Strapi URL in `.env.local`
3. Test API directly: `https://YOUR_STRAPI_URL/api/posts`

### Images Still Not Loading
1. Check `next.config.ts` has image domains
2. Verify image URLs from Strapi match the domain pattern
3. Clear `.next` folder: `rm -rf .next && npm run dev`

---

## Rollback Plan

If something breaks:

```bash
# Restore backup
rm -rf ezyfleet-blog-frontend-poc
mv ezyfleet-blog-frontend-poc-backup ezyfleet-blog-frontend-poc
cd ezyfleet-blog-frontend-poc
npm install
```

---

## Deploy After Migration

Once local testing passes:

```bash
git add .
git commit -m "Fix: Updated to working Next.js frontend"
git push
```

Vercel will auto-deploy. Make sure environment variables are set in Vercel dashboard!

---

## Need the Complete Fixed Version?

Check the `/home/claude/fixed-frontend/` directory - it contains the complete, working codebase ready to use!
