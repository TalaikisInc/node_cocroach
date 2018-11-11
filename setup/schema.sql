CREATE DATABASE node;

CREATE TABLE IF NOT EXISTS node.posts (
  id INT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  createdAt DATE NOT NULL DEFAULT current_date
);

INSERT INTO node.posts VALUES (1, 'Sample title', 'Content gors here', 'http://example.com/image.png');
INSERT INTO node.posts VALUES (2, 'Sample title 2', 'Content gors here', 'http://example.com/image.png');
INSERT INTO node.posts VALUES (3, 'Sample title 3', 'Content gors here', 'http://example.com/image.png');

CREATE USER IF NOT EXISTS cockroach;
GRANT ALL ON DATABASE node TO cockroach;
