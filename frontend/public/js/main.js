document.addEventListener("DOMContentLoaded", function () {

    // Get DOM elements
    const studentForm = document.getElementById('student-form');
    const studentsList = document.getElementById('students-list');
    const averageScoreElement = document.getElementById('average-score');

    // Load students when page loads
    loadStudents();

    // Handle form submission
    studentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const studentData = {
            student_id: parseInt(document.getElementById('student_id').value),
            first_name: document.getElementById('first_name').value,
            middle_name: document.getElementById('middle_name').value || null,
            last_name: document.getElementById('last_name').value,
            score: parseFloat(document.getElementById('score').value)
          };
          
        addStudent(studentData);
    });

    // Function to add a student
    async function addStudent(studentData) {
        try {
          const response = await fetch('/api/students', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            alert(data.error || 'An error occurred');
            return;
          }
          
          // Reset form
          studentForm.reset();
          
          // Reload students
          loadStudents();
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred');
        }
      }
      
    // Function to load students
    async function loadStudents() {
        try {
            const response = await fetch('/api/students');
            const data = await response.json();
            
            // Update average score
            averageScoreElement.textContent = data.average;
            
            // Clear students list
            studentsList.innerHTML = '';
            
            // Add students to table
            data.students.forEach(student => {
            const row = document.createElement('tr');
            
            // Format full name
            const fullName = student.middle_name 
                ? `${student.first_name} ${student.middle_name} ${student.last_name}`
                : `${student.first_name} ${student.last_name}`;
            
            row.innerHTML = `
                <td>${student.student_id}</td>
                <td>${fullName}</td>
                <td>${student.score}</td>
            `;
            
            studentsList.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error);
            console.log('Failed to load students');
        }
    }
});
    