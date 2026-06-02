-- ── Extensions ────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── users ─────────────────────────────────────────────────────────────────
create table public.users (
  id                   uuid primary key references auth.users(id) on delete cascade,
  name                 text,
  dob                  date,
  height_cm            int,
  shoulder_restriction boolean not null default false,
  ankle_restriction    boolean not null default false,
  created_at           timestamptz default now()
);

-- ── body_stats ────────────────────────────────────────────────────────────
create table public.body_stats (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references public.users(id) on delete cascade,
  logged_at             date not null default current_date,
  weight_kg             decimal(5,2),
  body_fat_pct          decimal(4,2),
  skeletal_muscle_pct   decimal(4,2),
  visceral_fat_index    int,
  vo2_max               decimal(4,1),
  resting_hr            int,
  notes                 text,
  created_at            timestamptz default now()
);

-- ── workouts ──────────────────────────────────────────────────────────────
create table public.workouts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.users(id) on delete cascade,
  date         date not null default current_date,
  workout_type text not null check (workout_type in ('Push','Pull','Legs','Full Body','Custom')),
  duration_min int,
  notes        text,
  created_at   timestamptz default now()
);

-- ── workout_sets ──────────────────────────────────────────────────────────
create table public.workout_sets (
  id            uuid primary key default gen_random_uuid(),
  workout_id    uuid not null references public.workouts(id) on delete cascade,
  exercise_name text not null,
  set_number    int not null,
  reps          int not null,
  weight_kg     decimal(5,2) not null,
  rpe           int check (rpe between 1 and 10),
  notes         text
);

-- ── runs ──────────────────────────────────────────────────────────────────
create table public.runs (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references public.users(id) on delete cascade,
  date                  date not null default current_date,
  distance_km           decimal(5,2) not null,
  duration_sec          int not null,
  avg_pace_sec_per_km   int generated always as (
    case when distance_km > 0 then round(duration_sec / distance_km) else null end
  ) stored,
  elevation_gain_m      int,
  avg_hr                int,
  notes                 text,
  created_at            timestamptz default now()
);

-- ── Indexes ───────────────────────────────────────────────────────────────
create index on public.body_stats (user_id, logged_at desc);
create index on public.workouts (user_id, date desc);
create index on public.workout_sets (workout_id);
create index on public.runs (user_id, date desc);

-- ── RLS ───────────────────────────────────────────────────────────────────
alter table public.users        enable row level security;
alter table public.body_stats   enable row level security;
alter table public.workouts     enable row level security;
alter table public.workout_sets enable row level security;
alter table public.runs         enable row level security;

create policy "users: own row"        on public.users        for all using (auth.uid() = id);
create policy "body_stats: own rows"  on public.body_stats   for all using (auth.uid() = user_id);
create policy "workouts: own rows"    on public.workouts     for all using (auth.uid() = user_id);
create policy "runs: own rows"        on public.runs         for all using (auth.uid() = user_id);
create policy "workout_sets: own"     on public.workout_sets for all using (
  exists (
    select 1 from public.workouts w
    where w.id = workout_sets.workout_id
      and w.user_id = auth.uid()
  )
);

-- ── Auto-create user row on sign-up ───────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.users (id, name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Account deletion RPC ──────────────────────────────────────────────────
create or replace function public.delete_user()
returns void language plpgsql security definer as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_user() from public;
grant execute on function public.delete_user() to authenticated;
