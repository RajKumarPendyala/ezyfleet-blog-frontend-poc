# 🎴 Quick Reference Card

## One-Line Commands

```bash
# Local Development
npm install && npm run dev

# Test Build
npm run build

# Deploy to Vercel (after pushing to GitHub)
# Just click "Deploy" on Vercel dashboard

# Fix Environment
echo "NEXT_PUBLIC_STRAPI_API_URL=https://wonderful-kindness-cbe166af41.strapiapp.com/api" > .env.local

# Clean Install
rm -rf node_modules .next package-lock.json && npm install
```

## File Locations Quick Map

| What | Where |
|------|-------|
| Home page | `src/app/page.tsx` |
| Blog post | `src/app/blog/[slug]/page.tsx` |
| Layout (header/footer) | `src/app/layout.tsx` |
| API calls | `src/lib/api.ts` |
| Config | `next.config.ts` |
| Env vars | `.env.local` |

## Environment Variables

```env
# Production (Vercel Dashboard)
NEXT_PUBLIC_STRAPI_API_URL=https://wonderful-kindness-cbe166af41.strapiapp.com/api

# Development (.env.local file)
NEXT_PUBLIC_STRAPI_API_URL=https://wonderful-kindness-cbe166af41.strapiapp.com/api
```

## Common Tasks

### Change Revalidation Time
```typescript
// In src/app/page.tsx or src/app/blog/[slug]/page.tsx
export const revalidate = 60; // Change number (seconds)
```

### Add Image Domain
```typescript
// In next.config.ts → images → remotePatterns
{
  protocol: 'https',
  hostname: 'your-domain.com',
  pathname: '/uploads/**',
}
```

### Fetch Specific Fields
```typescript
const { data } = await fetchAPI('posts', {
  fields: ['title', 'slug'],
  populate: {
    featuredImage: {
      fields: ['url']
    }
  }
});
```

## Error Quick Fixes

| Error | Fix |
|-------|-----|
| 400 Bad Request | Check API URL, verify Strapi is accessible |
| Images not loading | Add domain to `next.config.ts` |
| Build fails (params) | Make sure `params: Promise<{...}>` |
| TypeScript errors | Run `npm run build` to see details |
| Module not found | Run `npm install` |

## URLs to Remember

- **Strapi Backend**: https://wonderful-kindness-cbe166af41.strapiapp.com
- **Strapi API**: https://wonderful-kindness-cbe166af41.strapiapp.com/api
- **Local Dev**: http://localhost:3000
- **Vercel**: https://vercel.com

## File Checklist for Deployment

- [ ] All `.tsx` files in correct locations
- [ ] `.env.local` created locally
- [ ] Environment vars set in Vercel
- [ ] `.gitignore` present
- [ ] `package.json` intact
- [ ] `next.config.ts` has image domains
- [ ] No TypeScript errors (`npm run build`)

## Emergency Commands

```bash
# Everything broken? Start fresh:
rm -rf node_modules .next package-lock.json
npm install
npm run build
npm run dev

# Git messed up? Rollback:
git reset --hard HEAD
git clean -fd

# Vercel not updating? Force redeploy:
# Go to Vercel dashboard → Deployments → Click on latest → "Redeploy"
```

## Support Checklist

When asking for help, provide:
1. Error message (exact text)
2. Where it occurs (build/runtime/deployment)
3. Browser console output (F12)
4. Terminal output
5. URL you're trying to access

## Links to Documentation

- 📘 **Full Guide**: `README.md`
- 🚀 **Deployment**: `DEPLOYMENT.md`
- 🐛 **What Was Fixed**: `ISSUES-FIXED.md`
- 🔄 **Migration**: `MIGRATION.md`
- 🎯 **Getting Started**: `START-HERE.md`

---

**Print this card and keep it handy!** 🎴
