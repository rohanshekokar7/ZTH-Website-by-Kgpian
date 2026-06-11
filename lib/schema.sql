-- ═══════════════════════════════════════════════════════════════════════
-- ZTH Website — Supabase Database Schema
-- Run this SQL in your Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════════

-- ── 1. Create bookings table ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookings (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT NOT NULL,
  services    TEXT[] NOT NULL DEFAULT '{}',
  message     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'new'
                CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. Auto-update updated_at on row change ───────────────────────────
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── 3. Enable Row Level Security ──────────────────────────────────────
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- ── 4. RLS Policies ───────────────────────────────────────────────────

-- Allow ANYONE (anon) to INSERT — so the public form works
CREATE POLICY "Allow public form submissions"
  ON public.bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated admins to SELECT all rows
CREATE POLICY "Allow admin to view all bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated admins to UPDATE (e.g. change status)
CREATE POLICY "Allow admin to update bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated admins to DELETE
CREATE POLICY "Allow admin to delete bookings"
  ON public.bookings
  FOR DELETE
  TO authenticated
  USING (true);

-- ── 5. Index for faster queries ───────────────────────────────────────
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON public.bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON public.bookings (status);
CREATE INDEX IF NOT EXISTS bookings_email_idx ON public.bookings (email);

-- ── 6. Enable Realtime for admin live updates ─────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;

-- ═══════════════════════════════════════════════════════════════════════
-- HOW TO SET UP ADMIN USER:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Click "Add User" → Enter admin email + password
-- 3. That user can now log in at /login with the secret code
-- ═══════════════════════════════════════════════════════════════════════
