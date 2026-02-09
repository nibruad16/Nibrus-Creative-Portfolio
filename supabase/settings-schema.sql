-- Create site_settings table for general site configuration
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Site Info
  site_title TEXT DEFAULT 'Nibru Kefyalew',
  site_description TEXT DEFAULT 'I create stunning, impossible visuals that tell a story.',
  site_logo TEXT,
  
  -- Hero Section
  hero_title TEXT DEFAULT 'AI Content Creator & Video Ads Specialist',
  hero_subtitle TEXT DEFAULT 'I create stunning, impossible visuals that tell a story.',
  hero_video_url TEXT,
  hero_cta_primary_text TEXT DEFAULT 'View Work',
  hero_cta_primary_link TEXT DEFAULT '#projects',
  hero_cta_secondary_text TEXT DEFAULT 'Start a Project',
  hero_cta_secondary_link TEXT DEFAULT '#contact',
  
  -- About Section
  about_title TEXT DEFAULT 'A Results-Driven Video Producer',
  about_description TEXT,
  about_images JSONB,
  
  -- Contact Info
  contact_email TEXT DEFAULT 'nibruad16@gmail.com',
  contact_phone_primary TEXT DEFAULT '+251993231617',
  contact_phone_secondary TEXT DEFAULT '+251946942006',
  social_links JSONB,
  
  -- Footer
  footer_text TEXT,
  
  -- SEO
  meta_keywords TEXT[],
  meta_image TEXT
);

-- Insert default settings
INSERT INTO site_settings (id) 
VALUES ('00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  icon TEXT DEFAULT 'Stars',
  image TEXT,
  includes TEXT[],
  coming_soon BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true
);

-- Create triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies for site_settings
CREATE POLICY "Public can view site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create policies for services
CREATE POLICY "Public can view published services"
  ON services FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can do everything with services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert default services
INSERT INTO services (title, slug, summary, icon, includes, display_order) VALUES
('AI Image/Video Generation', 'ai-image-video-generation', 'Direct state‑of‑the‑art models to create bespoke visuals from a blank canvas — curated and edited cinematically.', 'Stars', ARRAY['Concept & prompt crafting', 'Curation & assembly', 'Color & sound polish'], 1),
('Cinematic Editing & Post‑Production', 'cinematic-editing-post-production', 'Editing, color grading, SFX, VFX, and CGI to build a world that is visually stunning and emotionally resonant.', 'Film', ARRAY['Editing', 'Color grading', 'Sound design', 'SFX/VFX/CGI'], 2),
('Long‑Form & Short‑Form Editing', 'long-form-short-form-editing', 'Narrative long‑form and high‑impact short‑form tailored to each platform without sacrificing craft.', 'Scissors', ARRAY['Master edit + cutdowns', 'Captions & titles', 'Aspect ratios'], 3),
('Promotion & Advert Creation', 'promotion-advert-creation', 'Concept‑to‑delivery campaigns merging cinematic craft with AI‑driven ideation for brand impact.', 'Megaphone', ARRAY['Concept & script', 'Production (live, AI, hybrid)', 'Final deliveries'], 4)
ON CONFLICT (slug) DO NOTHING;
