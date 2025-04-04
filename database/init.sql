-- Check if the database exists and create it if not
CREATE DATABASE IF NOT EXISTS course_db;
USE course_db;

-- Create the students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  middle_name VARCHAR(50),
  last_name VARCHAR(50) NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT student_id_range CHECK (student_id BETWEEN 1 AND 10),
  CONSTRAINT score_range CHECK (score BETWEEN 0 AND 100)
);