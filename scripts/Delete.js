/* Delete.js - Handles course deletion for teachers */

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.getElementById('confirmDelete').addEventListener('click', async function() {
    const courseId = getQueryParam('id');
    if (!courseId) {
        alert("No course ID provided.");
        return;
    }
    
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
            alert(data.error);
        } else {
            alert("Course deleted successfully!");
            window.location.href = 'Index.html';
        }
    } catch (err) {
        console.error(err);
        alert("Error deleting course.");
    }
});
