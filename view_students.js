document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/students")  // Change the URL if necessary
        .then(response => response.json())
        .then(data => {
            let studentTableBody = document.getElementById("studentTableBody");
            let totalScore = 0;


            // Clear previous data
            studentTableBody.innerHTML = "";


            // Insert student data into table
            data.forEach(student => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${student.studentId}</td>
                    <td>${student.firstName}</td>
                    <td>${student.lastName}</td>
                    <td>${student.score}</td>
                `;
                studentTableBody.appendChild(row);
                totalScore += student.score;
            });


            // Calculate & display average score
            let avgScore = (data.length > 0) ? (totalScore / data.length).toFixed(2) : "N/A";
            document.getElementById("averageScore").textContent = avgScore;
        })
        .catch(error => {
            console.error("Error fetching student data:", error);
            document.getElementById("averageScore").textContent = "Error fetching data";
        });
});


// Go back to index.html
function goBack() {
    window.location.href = "index.html";
}
