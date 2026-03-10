create table if not exists public.site_settings (
  key text primary key,
  value boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by text
);

alter table public.site_settings enable row level security;

create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

create policy "Admins can modify site settings"
on public.site_settings
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.email = auth.email()
      and admin_users.is_active = true
  )
)
with check (
  exists (
    select 1
    from public.admin_users
    where admin_users.email = auth.email()
      and admin_users.is_active = true
  )
);

insert into public.site_settings (key, value)
values ('maintenance_mode', false)
on conflict (key) do nothing;
