/* Details.js - Fetch and display course details */

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

window.addEventListener('DOMContentLoaded', async function() {
    const courseId = getQueryParam('id');
    if (!courseId) {
        document.getElementById('courseDetails').innerText = "No course ID provided.";
        return;
    }
    
    try {
        const res = await fetch(`/api/courses/${courseId}`);
        const course = await res.json();
        if (course.error) {
            document.getElementById('courseDetails').innerText = course.error;
        } else {
            document.getElementById('courseDetails').innerHTML = `
                <h2>${course.name}</h2>
                <p>${course.description || ''}</p>
                <p>Subject: ${course.subject || ''}</p>
                <p>Credits: ${course.credits}</p>
            `;
        }
    } catch (err) {
        console.error(err);
        document.getElementById('courseDetails').innerText = "Error retrieving course details.";
    }
});
