-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('video', 'image')),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  youtube_url TEXT,
  youtube_id TEXT,
  cover TEXT,
  videos JSONB,
  images JSONB,
  published BOOLEAN DEFAULT true
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS projects_slug_idx ON projects(slug);

-- Create index on type for filtering
CREATE INDEX IF NOT EXISTS projects_type_idx ON projects(type);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects(category);

-- Create index on published status
CREATE INDEX IF NOT EXISTS projects_published_idx ON projects(published);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published projects
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  USING (published = true);

-- Create policy to allow authenticated users to do everything
CREATE POLICY "Authenticated users can do everything"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated');

-- Create storage bucket for project media
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-media', 'project-media', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read access
CREATE POLICY "Public can view project media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-media');

-- Create storage policy for authenticated users to upload
CREATE POLICY "Authenticated users can upload project media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-media' AND auth.role() = 'authenticated');

-- Create storage policy for authenticated users to update
CREATE POLICY "Authenticated users can update project media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-media' AND auth.role() = 'authenticated');

-- Create storage policy for authenticated users to delete
CREATE POLICY "Authenticated users can delete project media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-media' AND auth.role() = 'authenticated');
