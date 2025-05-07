/* login.js - Handles user login */

document.getElementById('loginBtn').addEventListener('click', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.error) {
      document.getElementById('errorMsg').innerText = data.error;
    } else {
      localStorage.setItem('token', data.token);
      alert("Login successful!");
      window.location.href = 'index.html';
    }
  } catch (err) {
    console.error(err);
    document.getElementById('errorMsg').innerText = "Login failed.";
  }
});
