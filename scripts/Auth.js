console.log("Frontend initialized.");

document.addEventListener("DOMContentLoaded", () => {
  // Only run protected-page logic if we are NOT on a public page.
  const publicPages = ["login.html", "registration.html"];
  const currentPage = window.location.pathname.split("/").pop();
  if (publicPages.includes(currentPage)) {
    // On public pages, do not update the nav or force redirection.
    return;
  }

  const token = localStorage.getItem("token");
  const navBar = document.querySelector("nav .navbar-nav");
  const logoutBtn = document.getElementById("logout");

  if (!token) {
    if (logoutBtn) {
      logoutBtn.style.display = "none";
    }
    // Remove any existing login links (to avoid duplicates) before adding one.
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
    // Optionally, you might want to force a redirect here by uncommenting:
    // window.location.href = "login.html";
  } else {
    // When the user is authenticated, ensure the Logout button is visible.
    if (logoutBtn) {
      logoutBtn.style.display = "block";
    }
  }
});
