/* delete.js - Handles course deletion */

async function populateCourses() {
  try {
    const res = await fetch('/api/courses');
    const courses = await res.json();
    const dropdown = document.getElementById('courseDropDown');
    dropdown.innerHTML = "";
    courses.forEach(course => {
      const option = document.createElement('option');
      option.value = course._id;
      option.text = course.name;
      dropdown.appendChild(option);
    });
  } catch (err) {
    console.error(err);
    document.getElementById('error').innerText = "Error loading courses.";
  }
}

window.addEventListener('DOMContentLoaded', populateCourses);

document.getElementById('deleteBtn').addEventListener('click', async function(e) {
  e.preventDefault();
  const courseId = document.getElementById('courseDropDown').value;
  const token = localStorage.getItem('token');
  if (!token) {
    alert("You must be logged in as a teacher to delete courses.");
    return;
  }
  try {
    const res = await fetch(`/api/courses/${courseId}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': token
      }
    });
    const data = await res.json();
    if (data.error) {
      document.getElementById('error').innerText = data.error;
    } else {
      alert("Course deleted successfully!");
      populateCourses(); // Refresh list after deletion.
    }
  } catch (err) {
    console.error(err);
    document.getElementById('error').innerText = "Error deleting course.";
  }
});
