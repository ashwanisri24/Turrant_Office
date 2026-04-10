ALTER TABLE users
  ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
  ADD COLUMN IF NOT EXISTS last_name VARCHAR(100);

UPDATE users
SET
  first_name = COALESCE(first_name, split_part(full_name, ' ', 1)),
  last_name = COALESCE(
    last_name,
    NULLIF(trim(substr(full_name, length(split_part(full_name, ' ', 1)) + 1)), '')
  )
WHERE EXISTS (
  SELECT 1
  FROM information_schema.columns
  WHERE table_name = 'users' AND column_name = 'full_name'
);

UPDATE users
SET last_name = 'User'
WHERE last_name IS NULL OR trim(last_name) = '';

ALTER TABLE users
  ALTER COLUMN first_name SET NOT NULL,
  ALTER COLUMN last_name SET NOT NULL;

ALTER TABLE users
  DROP COLUMN IF EXISTS full_name;
