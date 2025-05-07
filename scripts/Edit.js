/* edit.js - Handles editing a course */

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

window.addEventListener('DOMContentLoaded', async function() {
  const courseId = getQueryParam('id');
  if (!courseId) {
    alert("No course ID provided.");
    return;
  }
  
  const token = localStorage.getItem('token');
  if (!token) {
    alert("You must be logged in as a teacher to edit courses.");
    return;
  }
  
  // Fetch existing course details to populate the form.
  try {
    const res = await fetch(`/api/courses/${courseId}`);
    const course = await res.json();
    if (course.error) {
      alert(course.error);
    } else {
      document.getElementById('courseID').value = course._id;
      document.getElementById('courseName').value = course.name;
      document.getElementById('courseDescription').value = course.description;
      document.getElementById('courseSubject').value = course.subject;
      document.getElementById('courseCredits').value = course.credits;
    }
  } catch (err) {
    console.error(err);
    alert("Error fetching course details.");
  }
  
  document.getElementById('updateBtn').addEventListener('click', async function(e) {
    e.preventDefault();
    const name = document.getElementById('courseName').value;
    const description = document.getElementById('courseDescription').value;
    const subject = document.getElementById('courseSubject').value;
    const credits = document.getElementById('courseCredits').value;
    
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ name, description, subject, credits })
      });
      const data = await res.json();
      if (data.error) {
        document.getElementById('error').innerText = data.error;
      } else {
        alert("Course updated successfully!");
        window.location.href = 'index.html';
      }
    } catch (err) {
      console.error(err);
      document.getElementById('error').innerText = "Error updating course.";
    }
  });
});
