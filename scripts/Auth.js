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

document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  const navBar = document.querySelector('nav ul');
  if (token) {
      // Show logout button; optionally ensure the logout button is visible.
      document.getElementById('logout').style.display = 'block';
  } else {
      // Remove logout button and add a login link.
      const logoutBtn = document.getElementById('logout');
      if(logoutBtn) {
          logoutBtn.style.display = 'none';
      }
      // Optionally, insert a login link into the nav.
      const loginLink = document.createElement('a');
      loginLink.href = 'login.html';
      loginLink.textContent = 'Login';
      loginLink.className = 'nav-link';
      const li = document.createElement('li');
      li.className = 'nav-item';
      li.appendChild(loginLink);
      navBar.appendChild(li);
  }
});


// Logout functionality
if (document.getElementById('logout')) {
  document.getElementById('logout').addEventListener('click', function() {
    removeToken();
    window.location.href = 'login.html';
  });
}
