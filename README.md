# Tito Vee's Kitchen

Foundation scaffold for a personal cooking website: elevated home cooking, intentional recipes, approachable food science. The current build is **not deployed** and user authentication has **not been tested** with a live Supabase project.

## Scope now
- Mobile-responsive homepage and navigation
- Signup, login, signout, password reset UI with Supabase Auth
- Member dashboard and role-aware admin dashboard shell
- Future-feature placeholders for Recipes, My Kitchen, and Wanna Meal Prep?
- **No AI integration or paid services required for initial development**

## Run locally (Windows PowerShell)
1. Install Node.js LTS and Git.
2. Run `git clone https://github.com/John-Velazquez/TitoVeesKitchen.git` then `cd TitoVeesKitchen`.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Create a Supabase project when ready to test authentication, run `supabase/schema.sql` in its SQL editor, and set your project's URL and **publishable/anon key** in `.env.local`. Never use a service-role key in `NEXT_PUBLIC_*` variables.
6. Configure Supabase Auth site URL and redirect allowlist to include `http://localhost:3000/**`. Enable email confirmation as appropriate.
7. Run `npm run dev` and open `http://localhost:3000`.
8. Sign up your own account, then grant admin using the commented SQL in `supabase/schema.sql` from the Supabase SQL editor.

## Important security note
The admin page currently performs a **client-side role check only** and is a dashboard placeholder, **not** a secure admin backend. Before any administrative read/write operation is implemented, enforce authorization in server endpoints and Supabase Row Level Security policies. Public visitors cannot create an admin role using the supplied database policies.

## Branding
The original onion/garlic artwork is supplied separately in the project Brand.zip. This commit uses a restrained placeholder design rather than recreating those characters. Approved PNG assets should be added to `public/brand/` before visual signoff; no redesign is authorized by this starter.

## Next milestone
Confirm local build, connect and test real authentication, test mobile responsiveness, and only then start recipe features.
