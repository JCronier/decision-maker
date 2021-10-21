-- Drop and recreate links table

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  user_id VARCHAR(255)
);
