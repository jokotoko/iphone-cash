-- Create the models table
CREATE TABLE IF NOT EXISTS public.models (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL,
    base_price INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid errors on re-run
DROP POLICY IF EXISTS "Allow public read access" ON public.models;
DROP POLICY IF EXISTS "Allow update for admins" ON public.models; -- Just in case we add this later

-- Create policy to allow read access to everyone
CREATE POLICY "Allow public read access"
ON public.models
FOR SELECT
TO public
USING (true);

-- Create policy to allow update access only to authenticated users (admins)
-- Assuming admin login uses Supabase Auth or we will use service role in API
-- For checking specifically, usually we trust the API to handle admin rights via service key
-- provided the client uses proper auth.
-- However, for the admin panel client-side (if using user auth), we need a policy.
-- Since current admin uses a simple cookie password check in API routes,
-- the frontend will verify via API. The API will likely use the SERVICE_ROLE key or
-- similar to update.
-- For now, let's allow Update for anon/public IF we strictly control it via API.
-- BETTER: Only allow read to public. Updates should happen via Service Role in API routes.

-- Insert initial data
INSERT INTO public.models (name, slug, base_price, sort_order)
VALUES
    ('iPhone 16 Pro Max', 'iphone-16-pro-max', 3600, 1),
    ('iPhone 16 Pro', 'iphone-16-pro', 3300, 2),
    ('iPhone 16', 'iphone-16', 3100, 3),
    ('iPhone 15 Pro Max', 'iphone-15-pro-max', 3000, 4),
    ('iPhone 15 Pro', 'iphone-15-pro', 2800, 5),
    ('iPhone 15', 'iphone-15', 2500, 6),
    ('iPhone 14 Pro Max', 'iphone-14-pro-max', 2400, 7),
    ('iPhone 14 Pro', 'iphone-14-pro', 2200, 8),
    ('iPhone 14', 'iphone-14', 2000, 9),
    ('iPhone 13', 'iphone-13', 1800, 10)
ON CONFLICT (name) DO UPDATE 
SET base_price = EXCLUDED.base_price;
