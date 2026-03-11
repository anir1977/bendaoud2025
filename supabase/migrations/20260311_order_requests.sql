create table if not exists public.order_requests (
  id bigint generated always as identity primary key,
  customer_name text not null,
  email text,
  phone text not null,
  city text not null,
  address text not null,
  notes text,
  payment_method text,
  status text not null default 'PENDING' check (status in ('PENDING', 'PROCESSED', 'CANCELED')),
  primary_product_title text,
  primary_product_price_mad numeric,
  total_amount_mad numeric not null default 0,
  items jsonb not null default '[]'::jsonb,
  source text not null default 'web_checkout',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists order_requests_status_idx on public.order_requests(status);
create index if not exists order_requests_created_at_idx on public.order_requests(created_at desc);

alter table public.order_requests enable row level security;

create policy if not exists order_requests_insert_public
on public.order_requests
for insert
to anon, authenticated
with check (true);

create policy if not exists order_requests_select_admin
on public.order_requests
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.email = auth.email()
      and admin_users.is_active = true
  )
);

create policy if not exists order_requests_update_admin
on public.order_requests
for update
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

create or replace function public.set_order_requests_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_order_requests_updated_at on public.order_requests;
create trigger trg_set_order_requests_updated_at
before update on public.order_requests
for each row
execute function public.set_order_requests_updated_at();
