-- Add slug-based analytics + comments fields

ALTER TABLE article_views
  ADD COLUMN IF NOT EXISTS article_slug TEXT,
  ADD COLUMN IF NOT EXISTS category_slug TEXT,
  ADD COLUMN IF NOT EXISTS author_sanity_id TEXT;

ALTER TABLE comments
  ADD COLUMN IF NOT EXISTS article_slug TEXT,
  ADD COLUMN IF NOT EXISTS parent_id UUID,
  ADD COLUMN IF NOT EXISTS guest_name TEXT,
  ADD COLUMN IF NOT EXISTS guest_email TEXT,
  ADD COLUMN IF NOT EXISTS user_id UUID,
  ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS body TEXT;

CREATE INDEX IF NOT EXISTS idx_views_slug ON article_views(article_slug);
CREATE INDEX IF NOT EXISTS idx_views_author ON article_views(author_sanity_id);
CREATE INDEX IF NOT EXISTS idx_comments_article_slug ON comments(article_slug);
