document.addEventListener("DOMContentLoaded", function () {
    
    let loginBtn = document.getElementById("loginBtn");
    let firstNameInput = document.getElementById("firstName");

    if (loginBtn && firstNameInput) {
        loginBtn.addEventListener("click", function () {
            let nameValue = firstNameInput.value.trim();

            if (nameValue === "") {
                alert("الرجاء إدخال الاسم أولاً!");
                return;
            }
            localStorage.setItem("loggedInUser", nameValue);

            alert("تم تسجيل الدخول بنجاح! أهلاً بك " + nameValue);

            window.location.href = "home.html";
        });
    }

    let userNameDisplay = document.getElementById("userNameDisplay");
    
    if (userNameDisplay) {

        let savedName = localStorage.getItem("loggedInUser");

        if (savedName) {
            userNameDisplay.innerText = savedName;
            
            let navUserLink = document.getElementById("navUserLink");
            if (navUserLink) {
                navUserLink.href = "homelogin.html"; 
            }
        }
    }
});

let logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
    });
}

// للبحث 
document.addEventListener("DOMContentLoaded", function () {
    
    let searchInput = document.getElementById("searchInput");
    
    let products = document.querySelectorAll(".p-pay");

    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            let searchText = e.target.value.toLowerCase().trim();

            products.forEach(function (product) {
                let pElement = product.querySelector("p");
                let productText = pElement ? pElement.innerText.toLowerCase() : "";

                if (productText.includes(searchText)) {
                    product.style.display = "flex"; 
                } else {
                    product.style.display = "none";
                }
            });
        });
    }
});