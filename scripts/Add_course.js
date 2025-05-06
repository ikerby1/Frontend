/* Add_course.js - Handles adding new courses (for teachers) */

document.getElementById('addCourseForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('courseName').value;
    const description = document.getElementById('courseDescription').value;
    const subject = document.getElementById('courseSubject').value;
    const credits = document.getElementById('courseCredits').value;
    
    const token = localStorage.getItem('token');
    if (!token) {
        alert("You must be logged in as a teacher to add courses.");
        return;
    }
    
    try {
        const res = await fetch('/api/courses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token
            },
            body: JSON.stringify({ name, description, subject, credits })
        });
        
        const data = await res.json();
        if (data.error) {
            alert(data.error);
        } else {
            alert("Course added successfully!");
            window.location.href = 'Index.html';
        }
    } catch (err) {
        console.error(err);
        alert("Error adding course.");
    }
});
