BEGIN;

DROP TABLE IF EXISTS users, sessions CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE sessions (
   sid TEXT PRIMARY KEY,
   data JSON NOT NULL
);

INSERT INTO users (email, password, name) VALUES
(
  'someone@gmail.com',
  '$2a$10$vzgLAxSa1k293giKSbVWi.GgSGmb1JB/kD1qWIg.mrUlt7UwVDCWG',
  'Test Testington'
);

INSERT INTO sessions (sid, data) VALUES
(
  'abc123',
  '{"test":"stuff"}'
);

COMMIT;
