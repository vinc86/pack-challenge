CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category TEXT NOT NULL,
  language TEXT NOT NULL,
  provider TEXT NOT NULL,
  roles TEXT[] NOT NULL DEFAULT '{}',
  file_path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);