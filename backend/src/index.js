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
