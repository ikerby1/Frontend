/* add_course.js - Handles adding new courses */

document.getElementById('addBtn').addEventListener('click', async function(e) {
  e.preventDefault();
  
  const courseName = document.getElementById('courseName').value;
  const courseDescription = document.getElementById('courseDescription').value;
  const courseSubject = document.getElementById('courseSubject').value;
  const courseCredits = document.getElementById('courseCredits').value;
  
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
      body: JSON.stringify({ name: courseName, description: courseDescription, subject: courseSubject, credits: courseCredits })
    });
    const data = await res.json();
    if (data.error) {
      document.getElementById('error').innerText = data.error;
    } else {
      alert("Course added successfully!");
      window.location.href = 'index.html';
    }
  } catch (err) {
    console.error(err);
    document.getElementById('error').innerText = "Error adding course.";
  }
});
