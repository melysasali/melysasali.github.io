document.addEventListener("DOMContentLoaded", () => {
 const signupForm = document.getElementById("signup-form");
 const loginStatus = document.getElementById("login-status");
 const signupStatus = document.getElementById("signup-status");
 const logoutBtn = document.getElementById("logout-btn");
 const loginSection = document.getElementById("login-section");
 const mainContent = document.getElementById("main-content");


 document.getElementById('show-signup').addEventListener('click', function (e) {
     e.preventDefault();
     document.getElementById('login-form').classList.remove('active');
     document.getElementById('signup-form').classList.add('active');
  });

 document.getElementById('show-login').addEventListener('click', function (e) {
     e.preventDefault();
     document.getElementById('signup-form').classList.remove('active');
     document.getElementById('login-form').classList.add('active');
 });

 const loggedInUser = sessionStorage.getItem("loggedInUser");
 if (loggedInUser) {
     showMainContent(loggedInUser);
 } else {
     showLoginForm();
 }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value.trim();

        fetch("users.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                return response.json();
            })
            .then((users) => {
                const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
                const allUsers = [...users, ...savedUsers];

                const user = allUsers.find(
                    (u) => u.username === username && u.password === password
                );
                if (user) {
                    sessionStorage.setItem("loggedInUser", username);

                    window.location.href = "https://github.com/melysasali/melysasali.github.io/blob/main/dtimp.html"; 
                } else {
                    loginStatus.textContent = "Invalid username or password.";
                    loginStatus.style.color = "red";
                }
            })
            .catch((error) => {
                console.error(error);
                loginStatus.textContent = "An error occurred. Please try again.";
                loginStatus.style.color = "red";
            });
    });


 logoutBtn.addEventListener("click", () => {
     sessionStorage.removeItem("loggedInUser");
     showLoginForm();
 });

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("signup-username").value.trim();
        const password = document.getElementById("signup-password").value.trim();
        const confirmPassword = document.getElementById("signup-confirm-password").value.trim();

        if (password !== confirmPassword) {
            signupStatus.textContent = "Passwords do not match!";
            signupStatus.style.color = "red";
            return;
        }

        fetch("users.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                return response.json();
            })
            .then((users) => {
                const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
                const allUsers = [...users, ...savedUsers];

                const userExists = allUsers.some((user) => user.username === username);
                if (userExists) {
                    signupStatus.textContent = "Username already exists!";
                    signupStatus.style.color = "red";
                } else 
                    savedUsers.push({ username, password });
                    localStorage.setItem("users", JSON.stringify(savedUsers));

                    signupStatus.textContent = "Sign-up successful! Redirecting...";
                    signupStatus.style.color = "green";
                    signupForm.reset();

                    setTimeout(() => {
                        window.location.href = "https://github.com/melysasali/melysasali.github.io/blob/main/dtimp.html"; 
                    }, 1000); 
                }
            })
            .catch((error) => {
                signupStatus.textContent = `An error occurred: ${error.message}`;
                signupStatus.style.color = "red";
            });
    });


 function showLoginForm() {
     loginSection.style.display = "block";
     mainContent.style.display = "none";
     loginStatus.textContent = "";
 }
});
