-- Apply after supabase/schema.sql and supabase/recipes.sql.
-- Keep security-definer helpers outside the public API schema.
create schema if not exists private;
alter function public.is_kitchen_admin() set schema private;
revoke all on function public.create_user_profile() from public, anon, authenticated;
grant usage on schema private to anon, authenticated;
revoke all on function private.is_kitchen_admin() from public;
grant execute on function private.is_kitchen_admin() to anon, authenticated;
-- Policies already depend on this function by OID, and remain valid after moving it.
