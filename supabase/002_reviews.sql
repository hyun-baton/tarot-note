create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  reading_id uuid references public.readings(id) on delete cascade not null,
  review_text text not null,
  reviewed_at timestamptz default now()
);

alter table public.reviews enable row level security;

create policy "allow all" on public.reviews for all using (true) with check (true);
