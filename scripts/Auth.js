/* Auth.js - Contains helper functions for authentication */

function setToken(token) {
    localStorage.setItem('token', token);
}

function getToken() {
    return localStorage.getItem('token');
}

function removeToken() {
    localStorage.removeItem('token');
}

// Registration handling
if (document.getElementById('registrationForm')) {
    document.getElementById('registrationForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, role })
            });
            
            const data = await res.json();
            if (data.error) {
                alert(data.error);
            } else {
                alert("Registration successful! Please login.");
                window.location.href = 'Login.html';
            }
        } catch (err) {
            console.error(err);
            alert("Registration failed.");
        }
    });
}
