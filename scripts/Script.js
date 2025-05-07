/* script.js - Lists all courses on the index page */

async function loadCourses() {
  try {
    const res = await fetch('/api/courses');
    const courses = await res.json();
    const listDiv = document.getElementById('list_of_courses');
    listDiv.innerHTML = "";
    courses.forEach(course => {
      const courseItem = document.createElement('div');
      courseItem.innerHTML = `<a href="details.html?id=${course._id}">${course.name}</a> - ${course.credits} credits`;
      listDiv.appendChild(courseItem);
    });
  } catch (err) {
    console.error(err);
    document.getElementById('list_of_courses').innerText = "Error loading courses.";
  }
}

window.addEventListener('DOMContentLoaded', loadCourses);
