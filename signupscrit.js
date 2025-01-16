document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const loginStatus = document.getElementById("login-status");
    const signupStatus = document.getElementById("signup-status");
    const logoutBtn = document.getElementById("logout-btn");
    const loginSection = document.getElementById("login-section");
    const mainContent = document.getElementById("main-content");

    document.getElementById("show-signup").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("login-form").classList.remove("active");
        document.getElementById("signup-form").classList.add("active");
    });

    document.getElementById("show-login").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("signup-form").classList.remove("active");
        document.getElementById("login-form").classList.add("active");
    });

    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
        showMainContent(loggedInUser);
    } else {
        showLoginForm();
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value.trim();

        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

        const user = savedUsers.find((u) => u.email === email && u.password === password);

        if (user) {
            sessionStorage.setItem("loggedInUser", email);
            window.location.href = "main.html";
        } else {
            loginStatus.textContent = "Invalid email or password.";
            loginStatus.style.color = "red";
        }
    });

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value.trim();
        const confirmPassword = document.getElementById("signup-confirm-password").value.trim();

        if (password !== confirmPassword) {
            signupStatus.textContent = "Passwords do not match!";
            signupStatus.style.color = "red";
            return;
        }

        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = savedUsers.some((user) => user.email === email);
        if (userExists) {
            signupStatus.textContent = "Email already exists!";
            signupStatus.style.color = "red";
        } else {
            savedUsers.push({ email, password });
            localStorage.setItem("users", JSON.stringify(savedUsers));

            signupStatus.textContent = "Sign-up successful! Redirecting...";
            signupStatus.style.color = "green";
            signupForm.reset();

            setTimeout(() => {
                window.location.href = "main.html";
            }, 1000);
        }
    });

    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("loggedInUser");
        showLoginForm();
    });

    function showLoginForm() {
        loginSection.style.display = "block";
        mainContent.style.display = "none";
        loginStatus.textContent = "";
    }

    function showMainContent(user) {
        loginSection.style.display = "none";
        mainContent.style.display = "block";
        mainContent.textContent = `Welcome, ${user}!`;
    }
});

