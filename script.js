document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".scroll-link");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); 
            
            const targetId = this.getAttribute("data-target");
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, 
                    behavior: "smooth"
                });
            }
        });
    });
});
function validateEmail(email) {

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
function inscriere(){
    
    const emailInput = document.getElementById("email-input");
        const email = emailInput.value.trim();
        if (email === "") {
            alert("Vă rugăm să introduceți un email!");
        } else if (!validateEmail(email)) {
            alert("Vă rugăm să introduceți un email valid!");
        } else {
            alert("Înscriere realizată cu succes!");
            emailInput.value = "";
        }

    
}
document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll(".produs__exemplu");

    products.forEach(product => {
        product.addEventListener("mouseenter", () => {
            let angle = 0;
            let direction = 1;
            product.style.transition = "transform 0.3s ease-in-out";

            
            product.style.transform = "scale(1.05)";

            
            const shakeInterval = setInterval(() => {
                angle = direction * 3; 
                product.style.transform = `scale(1.05) rotate(${angle}deg)`;
                
                direction *= -1; 
            }, 300);

            product.dataset.shakeInterval = shakeInterval;
        });

        product.addEventListener("mouseleave", () => {
            clearInterval(product.dataset.shakeInterval);

            // Smoothly reset to normal
            product.style.transition = "transform 0.3s ease-in-out";
            product.style.transform = "scale(1) rotate(0deg)";
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const signupButton = document.querySelector(".signup__container button");
    const loginButton = document.querySelector(".login__container button");
    
    if (signupButton) {
        signupButton.addEventListener("click", signup);
    }
    
    if (loginButton) {
        loginButton.addEventListener("click", login);
    }
});

function signup() {
    const username = document.querySelector(".signup__container input[type='text']").value;
    const email = document.querySelector(".signup__container input[type='email']").value;
    const password = document.querySelector(".signup__container input[type='password']").value;
    
    if (!username || !email || !password) {
        alert("Toate câmpurile sunt obligatorii!");
        return;
    }
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (users.find(user => user.username === username)) {
        alert("Acest utilizator există deja!");
        return;
    }
    
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Înregistrare reușită! Acum vă puteți autentifica.");
    window.location.href = "login.html";
}

function login() {
    const username = document.querySelector(".login__container input[type='text']").value;
    const password = document.querySelector(".login__container input[type='password']").value;
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        localStorage.setItem("loggedInUser", username);
        alert("Autentificare reușită! Veți fi redirecționat.");
        window.location.href = "index.html";
        updateHeader();
    } else {
        alert("Nume de utilizator sau parolă incorectă!");
    }
}function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Ați fost delogat!");
    window.location.href = "index.html";
}

function updateHeader() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const signupButtonContainer = document.getElementById("profile-menu-container");
    
    if (loggedInUser) {
        const profileDropdown = document.createElement("li");
        profileDropdown.innerHTML = `
            <div class="profile-menu">
                <button class="profile-button">${loggedInUser} ▼</button>
                <div class="dropdown-content">
                    <a href="#" onclick="logout()">Ieși din cont</a>
                </div>
            </div>
        `;
        signupButtonContainer.innerHTML = "";
        signupButtonContainer.appendChild(profileDropdown);
}
}
document.addEventListener("DOMContentLoaded", updateHeader());
