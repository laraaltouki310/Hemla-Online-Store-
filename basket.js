let addButtons = document.querySelectorAll(".add-basket");

    addButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            let productContainer = e.target.closest(".p-pay");
            
            if (productContainer) {
                let imgElement = productContainer.querySelector("img");
                let imgSrc = imgElement ? imgElement.getAttribute("src") : "";

                let pElement = productContainer.querySelector("p");
                let productText = pElement ? pElement.innerText : "";

                let basketTasks = JSON.parse(localStorage.getItem("tasks")) || [];

                let newProduct = {
                    id: Date.now(), 
                    image: imgSrc,  
                    text: productText 
                };

                basketTasks.push(newProduct);
                localStorage.setItem("tasks", JSON.stringify(basketTasks));

                alert("تمت إضافة المنتج إلى السلة بنجاح!");
            }
        });
    });

document.addEventListener("DOMContentLoaded", function () {
    let taskList = document.getElementById("taskList");
    let finalTotalPriceDisplay = document.getElementById("finalTotalPrice");

    function loadTasks() {
        let saved = localStorage.getItem("tasks");
        let tasks = saved ? JSON.parse(saved) : [];
        if (taskList) {
            renderTasks(tasks);
        }
    }

    function extractPrice(text) {
        let matches = text.match(/\d+/); 
        return matches ? parseInt(matches[0]) : 0;
    }

    function updateOrderTotal() {
        if (!taskList || !finalTotalPriceDisplay) return;

        let total = 0;
        let items = taskList.querySelectorAll(".basket-item");

        items.forEach(function (item) {

            let pText = item.querySelector(".basket-item-text").innerText;
            let price = extractPrice(pText);

            let quantity = parseInt(item.querySelector(".qty-input").value) || 1;

            total += price * quantity;
        });

        finalTotalPriceDisplay.innerText = "$ " + total;
    }

    function renderTasks(tasks) {
        taskList.innerHTML = "";
        
        if (tasks.length === 0) {
            taskList.innerHTML = '<li class="empty-message"> السلة فارغة . أضف منتج !</li>';
            if (finalTotalPriceDisplay) finalTotalPriceDisplay.innerText = "$ 0";
            return;
        }

        tasks.forEach(function (task) {
            let li = document.createElement("li");
            li.className = "basket-item"; 
            li.dataset.id = task.id;

            let img = document.createElement("img");
            img.src = task.image;
            img.className = "basket-item-img";
            li.appendChild(img);

            let p = document.createElement("p");
            p.className = "basket-item-text";
            p.innerHTML = task.text.replace(/\n/g, "<br>");
            li.appendChild(p);
            
            let quantityContainer = document.createElement("div");
            quantityContainer.className = "quantity-container";

            let qtyInput = document.createElement("input");
            qtyInput.type = "number";
            qtyInput.value = "1"; 
            qtyInput.min = "1";   
            qtyInput.max = "99";  
            qtyInput.className = "qty-input";
            
            qtyInput.addEventListener("input", function(e) {
                if (e.target.value < 1) e.target.value = 1;
                updateOrderTotal(); 
            });

            quantityContainer.appendChild(qtyInput);
            li.appendChild(quantityContainer); 

            let actionsDiv = document.createElement("div");
            actionsDiv.className = "task-actions";
            
            let deleteBtn = document.createElement("button");
            deleteBtn.className = "btn-delete";
            deleteBtn.innerText = "حذف";
            deleteBtn.onclick = function() {
                removeProduct(task.id);
            };
            actionsDiv.appendChild(deleteBtn);
            
            li.appendChild(actionsDiv);
            taskList.appendChild(li);

        });
        updateOrderTotal();
    }
    function removeProduct(id) {
        let saved = localStorage.getItem("tasks");
        if (saved) {
            let tasks = JSON.parse(saved);
            tasks = tasks.filter(task => task.id !== id);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks(); 
        }
    }
    function pay(){
        let pay = prompt('تم الشراء بنجاح ✅');
    } 

    loadTasks();
});

// لصفحة المفضلة 

document.addEventListener("DOMContentLoaded", function () {
    
    const emptyHeart = "icons/Colebemis-Feather-Heart.ico";
    const redHeart = "icons/Paomedia-Small-N-Flat-Heart.ico"; 

    let favoriteButtons = document.querySelectorAll(".icon-fav");

    function syncFavorites() {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favoriteButtons.forEach(img => {
            let productId = img.getAttribute("data-product-id");
            
            if (favorites.some(item => item.id === productId)) {
                img.src = redHeart;
            } else {
                img.src = emptyHeart;
            }
        });
    }

    if (favoriteButtons.length > 0) {
        syncFavorites();

        favoriteButtons.forEach(img => {
            img.addEventListener("click", function (e) {
                let productContainer = e.target.closest(".p-pay");
                let productId = e.target.getAttribute("data-product-id");
                
                let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
                
                let isAlreadyFav = favorites.some(item => item.id === productId);

                if (!isAlreadyFav) {
                    e.target.src = redHeart;

                    if (productContainer) {
                        let imgElement = productContainer.querySelector("img");
                        let imgSrc = imgElement ? imgElement.getAttribute("src") : "";

                        let pElement = productContainer.querySelector("p");
                        let productText = pElement ? pElement.innerText : "";

                        let newFavProduct = {
                            id: productId,
                            image: imgSrc,
                            text: productText
                        };

                        favorites.push(newFavProduct);
                        localStorage.setItem("favorites", JSON.stringify(favorites));
                    }
                } else {
                    e.target.src = emptyHeart;
                    favorites = favorites.filter(item => item.id !== productId);
                    localStorage.setItem("favorites", JSON.stringify(favorites));
                }
            });
        });
    }

    let favoriteList = document.getElementById("favoriteList");

    function loadFavoritesPage() {
        if (!favoriteList) return; 
        
        let savedFavs = localStorage.getItem("favorites");
        let favorites = savedFavs ? JSON.parse(savedFavs) : [];

        favoriteList.innerHTML = ""; 

        if (favorites.length === 0) {
            favoriteList.innerHTML = '<li class="empty-message" > المفضلة فارغة . أضف منتجات الى مفضلتك ! </li>';
            } else {
            favorites.forEach(function (product) {
                let li = document.createElement("li");
                li.className = "basket-item"; 
                li.style.listStyle = "none";

                let img = document.createElement("img");
                img.src = product.image;
                img.style.width = "auto";
                img.style.height = "130px";
                li.appendChild(img);

                let p = document.createElement("p");
                p.innerHTML = product.text.replace(/\n/g, "<br>");
                li.appendChild(p);

                let removeBtn = document.createElement("input");
                removeBtn.type = "button";
                removeBtn.value = "حذف";
                removeBtn.className = "fav-style"
                
                removeBtn.onclick = function () {
                    removeProductFromFavPage(product.id);
                };
                li.appendChild(removeBtn);

                favoriteList.appendChild(li);
            });
        }
    }

    function removeProductFromFavPage(id) {
        let savedFavs = localStorage.getItem("favorites");
        if (savedFavs) {
            let favorites = JSON.parse(savedFavs);
            favorites = favorites.filter(item => item.id !== id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            loadFavoritesPage(); 
        }
    }
    loadFavoritesPage();
});