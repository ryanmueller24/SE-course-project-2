// Importing required modules: Express for server creation, CORS for handling cross-origin requests, 
// MySQL2 for database interaction, and dotenv for loading environment variables.
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Create database connection pool through mysql
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'database',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'course_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Check database connection
const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Student model functions
const StudentModel = {
  // Create a new student
  create: async (studentData) => {
    try {
      const [result] = await pool.query(
        'INSERT INTO students (student_id, first_name, middle_name, last_name, score) VALUES (?, ?, ?, ?, ?)',
        [
          studentData.student_id,
          studentData.first_name,
          studentData.middle_name || null,
          studentData.last_name,
          studentData.score
        ]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Get all students ordered by score (ascending)
  getAllSorted: async () => {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM students ORDER BY score ASC'
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get average score
  getAverageScore: async () => {
    try {
      const [rows] = await pool.query(
        'SELECT AVG(score) as average FROM students'
      );
      return rows[0].average || 0;
    } catch (error) {
      throw error;
    }
  },

  // Count total students
  countStudents: async () => {
    try {
      const [rows] = await pool.query(
        'SELECT COUNT(*) as count FROM students'
      );
      return rows[0].count;
    } catch (error) {
      throw error;
    }
  }
};

// the Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Section ****
// API: Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await StudentModel.getAllSorted();
    const average = await StudentModel.getAverageScore();
    
    res.status(200).json({
      students,
      average: parseFloat(average).toFixed(2)
    });
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API: Create a new student
app.post('/api/students', async (req, res) => {
  try {
    // Validate input
    const { student_id, first_name, middle_name, last_name, score } = req.body;
    
    if (!student_id || !first_name || !last_name || score === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Validate student_id range
    if (student_id < 1 || student_id > 10) {
      return res.status(400).json({ error: 'Student ID must be between 1 and 10' });
    }
    
    // Validate score range
    if (score < 0 || score > 100) {
      return res.status(400).json({ error: 'Score must be between 0 and 100' });
    }
    
    // Count students
    const count = await StudentModel.countStudents();
    if (count >= 20) {
      return res.status(400).json({ error: 'Maximum of 20 students reached' });
    }
    
    // Create student
    await StudentModel.create({
      student_id,
      first_name,
      middle_name,
      last_name,
      score
    });
    
    res.status(201).json({ message: 'Student created successfully' });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// SETTING up the server 
// Start server
const startServer = async () => {
  // Check database connection (with retries)
  let isConnected = false;
  let retries = 5;
  
  while (retries > 0 && !isConnected) {
    isConnected = await checkConnection();
    
    if (!isConnected) {
      console.log(`Connection failed. Retrying in 5 seconds... (${retries} retries left)`);
      retries--;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } else {
    console.error('Failed to connect to the database after multiple retries. Server not started.');
    process.exit(1);
  }
};

startServer();