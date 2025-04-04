
document.getElementById('studentForm').addEventListener('submit', async function (e) {
    e.preventDefault();


    const studentData = {
        firstName: document.getElementById('firstName').value,
        middleName: document.getElementById('middleName').value,
        lastName: document.getElementById('lastName').value,
        studentId: parseInt(document.getElementById('studentId').value),
        score: parseFloat(document.getElementById('score').value)
    };


    try {
        const response = await fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });


        if (response.ok) {
            alert('Student data added successfully!');
            document.getElementById('studentForm').reset();
        } else {
            alert('Failed to add student. Please try again.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Error adding student data.');
    }
});


// Redirect to view_students.html when clicking "View Student Data"
document.getElementById("viewDataBtn").addEventListener("click", function () {
    window.location.href = "view_students.html";
});
