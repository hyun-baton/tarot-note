create table if not exists public.readings (
  id uuid default gen_random_uuid() primary key,
  card_name text not null,
  card_image_url text not null default '',
  reading_date date not null default current_date,
  question text,
  interpretation text,
  created_at timestamptz default now()
);

alter table public.readings enable row level security;

create policy "allow all" on public.readings for all using (true) with check (true);
