-- Drop and recreate results table

DROP TABLE IF EXISTS results CASCADE;
CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  choice_id INTEGER REFERENCES choices(id) ON DELETE CASCADE,
  rank SMALLINT,
  name VARCHAR(255)
);
