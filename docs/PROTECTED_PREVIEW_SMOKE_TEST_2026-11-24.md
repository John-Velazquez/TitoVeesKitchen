# Tito Vee's Kitchen — Protected Preview Smoke-Test Results
Date: 2026-11-24
Environment: Vercel **preview** (not production)
Deployment: `dpl_FW4EQWgm4r3N3BmchN5ohFQedR4d`
Commit: `1b60a6f2775d09e73439745954ab87c4cf709051` (READY)
Access method: authenticated Vercel deployment fetch; deployment protection was **not disabled**.

## Server and routing
A protected previous commit `f2329b7` was fetched successfully with HTTP 200 for:
- `/`
- `/recipes`
- `/recipes/wok-glazed-broccoli`
- `/login`
- `/admin/recipes`

**Caveat:** HTTP 200 on an admin route only means the HTML shell exists; client-side authorization, hydration, redirects, and writes have not been verified through interactive browser tests.

## SEO smoke test — latest exact code
- Published `/recipes/wok-glazed-broccoli`: HTTP 200, title `Wok-Glazed Broccoli | Tito Vee's Kitchen`, descriptive meta description, canonical `https://titovees-kitchen-preview.vercel.app/recipes/wok-glazed-broccoli`.
- Draft `/recipes/coquito`: HTTP 200, title `Recipe not available | Tito Vee's Kitchen`, `noindex, nofollow`.
- Unknown `/recipes/no-such-tito-vee-recipe`: HTTP 200, same not-available and `noindex, nofollow`.
- Caveat: Unknown/draft pages return HTTP 200 rather than HTTP 404. This is suboptimal for HTTP semantics; admin draft preview uses client-side auth, so blindly forcing server-side 404 could break owner previews. Address before public SEO launch if desired.

## Database security validation
Read-only transaction under `SET LOCAL ROLE anon` returned:
- 49 visible published recipes
- 0 visible private editorial notes
- 4 enabled visible brand links

RLS enabled on `recipes`, `recipe_editor_notes`, `profiles` and `brand_links`. Policy inspection verifies admin-only write patterns. This is not a replacement for testing authenticated non-admin and admin roles.

## Repairs verified in build
- Ingredient terms added to recipe search filter: code changed at `f2329b7`; Vercel deployment READY. **Browser typing/filter interaction still untested.**
- Missing Supabase service now displays service error on recipe detail rather than a misleading unpublished-recipe message: `2e6d3ba`; Vercel deployment READY.
- Published-only server-generated recipe metadata and exclusion of drafts from indexing: `1b60a6f`; Vercel deployment READY and metadata HTTP tested.

## Not performed
- No production promotion or public launch
- No change to Vercel SSO/protection
- No tests of interactive user signup, login, password recovery, private/admin write operations, image uploads, or mobile rendering
- No automatic publishing/unpublishing/altering recipe records
- No accessibility audit, visual screenshot comparison, Lighthouse run or performance benchmark

## Remaining launch blockers
1. Interactively verify browser navigation/search, authenticated admin protections, recipe editor, logout/relogin, and mobile usability.
2. Decide on curation of 49 published recipes; 23 lack yield and 49 lack original final photo.
3. Investigate repeatedly observed Next.js SWC lockfile warning and check dependency pinning.
4. Address client-side rendered recipe content for search engine discovery and appropriate HTTP 404 behavior.
5. Confirm production release target, deploy/promote reviewed commit, then **with owner permission** reconfigure visitor access.
6. Test the free alias anonymously **after** launch approval.
