/* init.js - Common initialization code */
console.log("Frontend initialized.");

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const navBar = document.querySelector("nav .navbar-nav");
    const logoutBtn = document.getElementById("logout");
  
    // If no token is present, hide the logout button and add Login/Registration links.
    if (!token) {
      if (logoutBtn) {
        logoutBtn.style.display = "none";
      }
      
      // Remove any existing login links so we avoid duplicates.
      const existingLoginLink = document.getElementById("loginLink");
      if (!existingLoginLink && navBar) {
        const li = document.createElement("li");
        li.className = "nav-item";
        const a = document.createElement("a");
        a.href = "login.html";
        a.textContent = "Login";
        a.className = "nav-link";
        a.id = "loginLink";
        li.appendChild(a);
        navBar.appendChild(li);
      }
  
      // Optionally, you can redirect immediately to the login page:
      // window.location.href = "login.html";
    } else {
      // When the user is authenticated, ensure the Logout button is visible.
      if (logoutBtn) {
        logoutBtn.style.display = "block";
      }
    }
  });
  