/* Login.js - Handles user login */

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await res.json();
        if (data.error) {
            alert(data.error);
        } else {
            localStorage.setItem('token', data.token);
            alert("Login successful!");
            window.location.href = 'Index.html';
        }
    } catch (err) {
        console.error(err);
        alert("Login failed.");
    }
});
