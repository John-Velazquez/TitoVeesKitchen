-- Editable external brand links for Tito Vee's Kitchen.
-- The public may read only active brands with a valid HTTPS destination.
-- Owner/admin exclusively maintains entries through the Recipe Manager.
create table if not exists public.brand_links (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (length(trim(name)) > 0),
  website_url text not null default '' check (
    website_url = '' or website_url ~* '^https://[^[:space:]]+\\.[^[:space:]]+$'
  ),
  aliases text[] not null default '{}'::text[],
  enabled boolean not null default true,
  notes text not null default '',
  updated_at timestamptz not null default now()
);
create index if not exists brand_links_name_idx on public.brand_links(name);
alter table public.brand_links enable row level security;
drop policy if exists "Public brand website links" on public.brand_links;
create policy "Public brand website links" on public.brand_links for select
to anon,authenticated using (enabled and website_url <> '' or (select private.is_kitchen_admin()));
drop policy if exists "Admins add brand links" on public.brand_links;
create policy "Admins add brand links" on public.brand_links for insert to authenticated
with check ((select private.is_kitchen_admin()));
drop policy if exists "Admins update brand links" on public.brand_links;
create policy "Admins update brand links" on public.brand_links for update to authenticated
using ((select private.is_kitchen_admin())) with check ((select private.is_kitchen_admin()));
drop policy if exists "Admins remove brand links" on public.brand_links;
create policy "Admins remove brand links" on public.brand_links for delete to authenticated
using ((select private.is_kitchen_admin()));
grant select on public.brand_links to anon,authenticated;
grant insert,update,delete on public.brand_links to authenticated;

-- The identity of the seasoning described as "Dot's" has not been verified.
-- We preserve the brand name without inventing an external destination.
insert into public.brand_links(name,website_url,aliases,enabled,notes)
values ('Dot''s','',array['DOTS','Dot’s','Dot''s'],true,
'Confirm the exact seasoning manufacturer before adding an official URL. Do not confuse with Dot''s Pretzels or Dot Foods.')
on conflict (name) do nothing;
