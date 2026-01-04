-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Home/Hero Section
CREATE TABLE IF NOT EXISTS home (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  value_proposition TEXT NOT NULL,
  photo_url TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('AI/Data', 'Backend', 'Frontend', 'Tools')),
  logo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('AI', 'Data', 'Model')),
  thumbnail_url TEXT,
  demo_url TEXT,
  view_url TEXT,
  technologies TEXT[],
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experience
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Personal Project', 'Freelance', 'Collaboration')),
  thumbnail_url TEXT,
  demo_url TEXT,
  view_url TEXT,
  technologies TEXT[],
  date_start DATE,
  date_end DATE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog
CREATE TABLE IF NOT EXISTS blog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('What You Learned', 'How You Built Something', 'Lessons From Failure')),
  thumbnail_url TEXT,
  content TEXT,
  view_url TEXT,
  read_time INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact
CREATE TABLE IF NOT EXISTS contact (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL CHECK (platform IN ('Email', 'LinkedIn', 'GitHub', 'Calendly')),
  url TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE home ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (portfolio is public)
CREATE POLICY "Allow public read access on home" ON home FOR SELECT USING (true);
CREATE POLICY "Allow public read access on skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Allow public read access on blog" ON blog FOR SELECT USING (true);
CREATE POLICY "Allow public read access on contact" ON contact FOR SELECT USING (true);

-- Admin-only write access (requires authenticated user with is_admin metadata)
CREATE POLICY "Allow admin insert on home" ON home FOR INSERT WITH CHECK (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
CREATE POLICY "Allow admin update on home" ON home FOR UPDATE USING (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
CREATE POLICY "Allow admin delete on home" ON home FOR DELETE USING (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);

CREATE POLICY "Allow admin insert on skills" ON skills FOR INSERT WITH CHECK (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
CREATE POLICY "Allow admin update on skills" ON skills FOR UPDATE USING (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
CREATE POLICY "Allow admin delete on skills" ON skills FOR DELETE USING (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);

CREATE POLICY "Allow admin insert on projects" ON projects FOR INSERT WITH CHECK (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
CREATE POLICY "Allow admin update on projects" ON projects FOR UPDATE USING (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
CREATE POLICY "Allow admin delete on projects" ON projects FOR DELETE USING (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);

CREATE POLICY "Allow admin insert on experience" ON experience FOR INSERT WITH CHECK (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
CREATE POLICY "Allow admin update on experience" ON experience FOR UPDATE USING (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
CREATE POLICY "Allow admin delete on experience" ON experience FOR DELETE USING (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);

CREATE POLICY "Allow admin insert on blog" ON blog FOR INSERT WITH CHECK (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
CREATE POLICY "Allow admin update on blog" ON blog FOR UPDATE USING (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
CREATE POLICY "Allow admin delete on blog" ON blog FOR DELETE USING (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);

CREATE POLICY "Allow admin insert on contact" ON contact FOR INSERT WITH CHECK (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
CREATE POLICY "Allow admin update on contact" ON contact FOR UPDATE USING (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
CREATE POLICY "Allow admin delete on contact" ON contact FOR DELETE USING (
  (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
);
