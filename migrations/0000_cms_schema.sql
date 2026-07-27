-- Idempotent CMS + contacts schema for PostgreSQL.
-- Prefer runtime ensure via server/ensureSchema.ts on app boot.
-- Manual apply (optional): psql "$DATABASE_URL" -f migrations/0000_cms_schema.sql

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  insurance_type text NOT NULL,
  message text NOT NULL,
  form_name text DEFAULT 'Contact Form',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cms_pages (
  id varchar PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT '',
  appearance text NOT NULL DEFAULT 'services',
  content text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft',
  seo jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS cms_blog_posts (
  id varchar PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT '',
  appearance text NOT NULL DEFAULT 'blog_listing',
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT 'Shiv Insurance',
  featured_image text NOT NULL DEFAULT '',
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  seo jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS cms_testimonials (
  id varchar PRIMARY KEY,
  name text NOT NULL,
  company text NOT NULL DEFAULT '',
  content text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS cms_downloads (
  id varchar PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Proposal Forms',
  file_size text NOT NULL DEFAULT '',
  file_path text NOT NULL,
  icon text NOT NULL DEFAULT 'file-text',
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS cms_settings (
  id varchar PRIMARY KEY,
  lead_email text NOT NULL DEFAULT 'info@shivinsbro.co.ke',
  site_name text NOT NULL DEFAULT 'Shiv Insurance Brokers Ltd',
  site_url text NOT NULL DEFAULT '',
  default_meta_title text NOT NULL DEFAULT 'Shiv Insurance Brokers Ltd',
  default_meta_description text NOT NULL DEFAULT '',
  default_meta_keywords text NOT NULL DEFAULT '',
  default_og_image text NOT NULL DEFAULT '',
  twitter_handle text NOT NULL DEFAULT '',
  google_analytics_id text NOT NULL DEFAULT '',
  google_tag_manager_id text NOT NULL DEFAULT '',
  head_scripts text NOT NULL DEFAULT '',
  footer_scripts text NOT NULL DEFAULT '',
  robots_txt text NOT NULL DEFAULT 'User-agent: *\nAllow: /'
);
