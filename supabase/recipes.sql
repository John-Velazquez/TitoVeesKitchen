-- Apply AFTER supabase/schema.sql. Safe to re-run.
-- Recipe publication and ownership are enforced in PostgreSQL, not by hidden UI controls.
create or replace function public.is_kitchen_admin()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;
revoke all on function public.is_kitchen_admin() from public;
grant execute on function public.is_kitchen_admin() to anon, authenticated;

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(trim(title)) > 0),
  category text not null default 'Other',
  summary text not null default '',
  yield_text text not null default '',
  prep_minutes integer check (prep_minutes is null or prep_minutes >= 0),
  cook_minutes integer check (cook_minutes is null or cook_minutes >= 0),
  equipment text not null default '',
  ingredients text not null default '',
  instructions text not null default '',
  substitutions text not null default '',
  storage_notes text not null default '',
  quick_tricks text not null default '',
  macros text not null default '',
  photo_url text not null default '',
  video_url text not null default '',
  source_notes text not null default '',
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint publish_requires_recipe check (
    status <> 'published' or
    (length(trim(ingredients)) > 0 and length(trim(instructions)) > 0)
  )
);
create index if not exists recipes_status_category_idx on public.recipes(status, category);
create or replace function public.touch_recipe_updated_at()
returns trigger language plpgsql set search_path = ''
as $$ begin new.updated_at := now(); return new; end; $$;
drop trigger if exists recipe_updated_at on public.recipes;
create trigger recipe_updated_at before update on public.recipes
for each row execute function public.touch_recipe_updated_at();

alter table public.recipes enable row level security;
drop policy if exists "Published recipes are visible" on public.recipes;
create policy "Published recipes are visible" on public.recipes
  for select to anon, authenticated
  using (status = 'published' or (select public.is_kitchen_admin()));
drop policy if exists "Admin inserts recipes" on public.recipes;
create policy "Admin inserts recipes" on public.recipes
  for insert to authenticated with check ((select public.is_kitchen_admin()));
drop policy if exists "Admin updates recipes" on public.recipes;
create policy "Admin updates recipes" on public.recipes
  for update to authenticated
  using ((select public.is_kitchen_admin()))
  with check ((select public.is_kitchen_admin()));
drop policy if exists "Admin deletes recipes" on public.recipes;
create policy "Admin deletes recipes" on public.recipes
  for delete to authenticated using ((select public.is_kitchen_admin()));

-- Optional public images for published recipes. Upload rights are admin-only.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('recipe-photos','recipe-photos',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update
set public = excluded.public, file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "Kitchen admin uploads recipe photos" on storage.objects;
create policy "Kitchen admin uploads recipe photos" on storage.objects
for insert to authenticated
with check (bucket_id = 'recipe-photos' and (select public.is_kitchen_admin()));
drop policy if exists "Kitchen admin removes recipe photos" on storage.objects;
create policy "Kitchen admin removes recipe photos" on storage.objects
for delete to authenticated
using (bucket_id = 'recipe-photos' and (select public.is_kitchen_admin()));
-- Existing images are intentionally not overwritten. Use a unique file name per upload.
