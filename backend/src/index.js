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
      const students = await StudentModel.getAllSorted();
      if (students.length === 0) return 0;

      const totalScore = students.reduce((sum, student) => sum + student.score, 0);
      return totalScore / students.length;
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