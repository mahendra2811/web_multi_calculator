-- Push notification subscriptions (anonymous — no auth required)
create table if not exists push_subscriptions (
  id         uuid primary key default gen_random_uuid(),
  endpoint   text unique not null,
  p256dh     text not null,
  auth       text not null,
  user_id    uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

alter table push_subscriptions enable row level security;

-- Anyone (anon) can INSERT their own subscription
create policy "Anyone can subscribe"
  on push_subscriptions for insert
  with check (true);

-- Only the service role can SELECT all subscriptions (for sending pushes)
create policy "Service role reads all"
  on push_subscriptions for select
  using (auth.role() = 'service_role');

-- Only the service role can UPDATE subscriptions (e.g. refresh keys)
create policy "Service role updates"
  on push_subscriptions for update
  using (auth.role() = 'service_role');

-- Only the service role can DELETE (expired/unsubscribed endpoints)
create policy "Service role deletes"
  on push_subscriptions for delete
  using (auth.role() = 'service_role');

-- Index for fast endpoint lookup
create index if not exists idx_push_subscriptions_endpoint
  on push_subscriptions(endpoint);
