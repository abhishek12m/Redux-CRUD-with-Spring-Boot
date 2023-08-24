
CREATE TABLE TASK (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(1000),
  completed BOOLEAN NOT NULL
);


INSERT INTO TASK (title, description, completed) VALUES
  ('Task 1', 'Description for Task 1', false),
  ('Task 2', 'Description for Task 2', true);
