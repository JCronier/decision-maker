-- Drop and recreate links table

DROP TABLE IF EXISTS links CASCADE;
CREATE TABLE links (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  admin_url VARCHAR(255),
  submit_url VARCHAR(255),
  results_url VARCHAR(255)
);
