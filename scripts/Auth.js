/* auth.js - Contains helper functions for authentication */

function setToken(token) {
  localStorage.setItem('token', token);
}

function getToken() {
  return localStorage.getItem('token');
}

function removeToken() {
  localStorage.removeItem('token');
}

// Registration form handling
if (document.getElementById('registrationForm')) {
  document.getElementById('registerBtn').addEventListener('click', async function(e) {
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
        document.getElementById('error').innerText = data.error;
      } else {
        alert("Registration successful! Please login.");
        window.location.href = 'login.html';
      }
    } catch (err) {
      console.error(err);
      document.getElementById('error').innerText = "Registration failed.";
    }
  });
}

// Logout functionality
if (document.getElementById('logout')) {
  document.getElementById('logout').addEventListener('click', function() {
    removeToken();
    window.location.href = 'login.html';
  });
}
