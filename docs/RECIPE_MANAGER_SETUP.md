# Recipe Manager — Setup and Verification

This implementation lives on `feature/recipe-catalog-design-v1`; it is **not deployed**. No Supabase project was accessed or modified by this change.

## What has been implemented
- Owner-only manager at `/admin/recipes`, linked from `/admin`
- New, edit, draft, publish, and permanent delete (with confirmation)
- Title, category, slug, summary, yield, prep/cook time, tools, ingredients, method, substitutions, storage, tricks, nutritional estimates, video URL, photos
- Admin-only private provenance notes stored in a separate protected table
- Photo uploads to an admin-writeable public image bucket, max 5 MB (JPG, PNG, WebP)
- One-click import of up to 50 reconstructed catalog titles as **drafts**, with no published changes and no overwrites of existing recipe slugs
- Public catalog queries published recipe rows from Supabase and preserves the earlier archive reference cards
- Published recipe pages use shared styling. The static ghee page is retained as a fallback; publishing a ghee record overrides it.

## Setup (manual owner action required)
1. Check out the feature branch and run `npm install`.
2. Create/configure your Supabase project and the `.env.local` values from `.env.example`.
3. Run `supabase/schema.sql` once in the Supabase SQL editor (if not previously run).
4. Run `supabase/recipes.sql` in the SQL editor **after** the base schema.
5. Set the Authentication Site URL and permitted redirects for your actual app URL and local development URL.
6. Sign up your owner account at `/login`, verify email if required.
7. In the SQL editor grant your account the admin role by account UUID or account email; the existing `supabase/schema.sql` includes a commented example. Do not expose service-role keys in the browser.
8. Start the app with `npm run dev` and open `/admin/recipes`. Sign in.
9. In Recipe Manager, choose **Import archive**, then **Import missing drafts**. This is an explicit one-time import; nothing is automatically added to Supabase by a code commit.
10. Open an imported draft, complete ingredients, method, cooking notes and verified measurements, then **Publish**.

## Manual acceptance checks
- Anonymous or ordinary member opening `/admin/recipes` must not see or edit recipe data.
- An ordinary member attempting direct Supabase writes against `recipes`, `recipe_editor_notes`, or the photo bucket must be denied by RLS.
- An anonymous public recipe query must see published rows only. Private editorial notes must not be queryable.
- Admin draft creation succeeds; public catalog does not list it as a published recipe.
- Admin publication with missing method or ingredients is refused by UI and SQL constraints.
- Admin publication with a complete method and ingredients appears in the public published section.
- Editing the published record changes the public recipe page; saving it as a draft removes its published version from Supabase public queries.
- Upload a permitted image as admin and confirm it displays on the public recipe page; reject files greater than 5 MB or with unsupported MIME types.
- Archive import should not overwrite existing recipes or automatically publish anything.
- Test on small mobile screens and desktop; run `npm run build`.

## Deliberately not included
- Rich-text / drag-and-drop block editing
- Recipe version history or rollback
- Automatic food-safety verification or accurate nutrition computation
- Serving-size arithmetic, pantry matching, Kitchen Lab popups
- Automated video embedding (a link is offered)
- Custom-branded printable PDF exports
- Full historical recipe reconstruction; older v0.3–v1.2 original source files are not currently available

## Security caveats
- The frontend admin check is for experience only. The **database row policies** in `supabase/recipes.sql` enforce write access.
- Public photo bucket URLs are public even when attached to a draft. Do not upload sensitive images.
- Published source fields must be treated as public. Editorial source notes are stored separately with admin-only RLS.
- Anyone with a database administrator/service-role key can bypass normal RLS. Never place it in `NEXT_PUBLIC_*`.
- This implementation has **not** been verified against a live Supabase instance, and the build has not been executed in this session.
