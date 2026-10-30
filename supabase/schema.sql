-- Run in the Supabase SQL editor after creating a project.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('member','admin')),
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Members can read their own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id);
-- No client insert, update, or delete policies. Only privileged service/admin setup can change roles.
create or replace function public.create_user_profile() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id,role) values (new.id,'member');
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.create_user_profile();
-- AFTER signing up your owner account, grant admin from the Supabase SQL editor.
-- Replace the address with your real owner email (never place privileged keys in client code):
-- update public.profiles set role='admin' where id=(select id from auth.users where email='owner@example.com');
