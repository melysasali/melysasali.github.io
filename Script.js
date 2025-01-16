document.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${e.pageX}px`;
    sparkle.style.top = `${e.pageY}px`;

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

// Funcțiile pentru salvarea și încărcarea datelor din LocalStorage
const saveToLocalStorage = (category, imageUrl) => {
    const storedData = JSON.parse(localStorage.getItem("categories")) || {};
    if (!storedData[category]) storedData[category] = [];
    storedData[category].push(imageUrl);
    localStorage.setItem("categories", JSON.stringify(storedData));
};

const loadFromLocalStorage = () => {
    const storedData = JSON.parse(localStorage.getItem("categories")) || {};
    Object.keys(storedData).forEach(category => {
        const categorySection = document.getElementById(category);
        if (categorySection) {
            let itemList = categorySection.querySelector("ul");
            if (!itemList) {
                itemList = document.createElement("ul");
                categorySection.appendChild(itemList);
            }
            storedData[category].forEach(imageUrl => {
                const newItem = document.createElement("li");
                const newImage = document.createElement("img");
                newImage.src = imageUrl;
                newImage.alt = "User-added item";
                newItem.appendChild(newImage);
                itemList.appendChild(newItem);
            });
        }
    });
};


document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style");
    style.textContent = `
    .styled-button {
        background-color: #f8bbd0; /* Pink background */
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 10px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .styled-button:hover {
        background-color: #d81b60; /* Darker pink on hover */
        transform: scale(1.05);
    }

    .styled-button:active {
        transform: scale(1);
        background-color: #c2185b; /* Even darker pink on active click */
    }
`;
    document.head.appendChild(style);

    const randomItemButton = document.createElement("button");
    randomItemButton.textContent = "Add Random Item";
    randomItemButton.className = "styled-button";
    document.body.appendChild(randomItemButton);

    randomItemButton.addEventListener("click", () => {
        const categories = Array.from(document.querySelectorAll(".category"));
        if (categories.length === 0) {
            alert("No categories found!");
            return;
        }

        const categoryNames = categories.map((cat) => cat.id).join(", ");
        const selectedCategory = prompt(`Enter the category to add an item (${categoryNames}):`);
        const categorySection = document.getElementById(selectedCategory);

        if (!categorySection) {
            alert("Invalid category selected.");
            return;
        }

        // Solicită URL-ul imaginii și validează-l
        const photoUrl = prompt("Enter the photo URL for the new item:");

        let itemList = categorySection.querySelector("ul");
        if (!itemList) {
            itemList = document.createElement("ul");
            categorySection.appendChild(itemList);
        }

        const newItem = document.createElement("li");
        const newImage = document.createElement("img");
        newImage.src = photoUrl;
        newImage.alt = "User-added item";

        newItem.appendChild(newImage);
        itemList.appendChild(newItem);

        // Salvează în LocalStorage
        saveToLocalStorage(selectedCategory, photoUrl);

        alert("Item added successfully!");
    });

    const changeBgButton = document.createElement("button");
    changeBgButton.textContent = "Change Background Color";
    changeBgButton.className = "styled-button";
    document.body.appendChild(changeBgButton);

    changeBgButton.addEventListener("click", () => {
        const colors = ["#f8bbd0", "#ffccbc", "#dcedc8", "#b3e5fc", "#ffcdd2"];
        document.body.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
    });

    const deletePhotosButton = document.createElement("button");
    deletePhotosButton.textContent = "Delete Photos";
    deletePhotosButton.className = "styled-button";
    deletePhotosButton.style.marginTop = "10px";
    document.body.appendChild(deletePhotosButton);

    deletePhotosButton.addEventListener("click", () => {
        const allImages = document.querySelectorAll(".category img");

        if (allImages.length === 0) {
            alert("No photos found to delete!");
            return;
        }

        allImages.forEach((img) => {
            img.style.border = "2px solid red";
            img.title = "Click to delete this photo";

            img.addEventListener("click", function handleDelete() {
                const confirmDelete = confirm("Are you sure you want to delete this photo?");
                if (confirmDelete) {
                    img.remove();
                    alert("Photo deleted successfully!");
                }

                img.removeEventListener("click", handleDelete);
                img.style.border = "none";
                img.title = "";
            });
        });

        alert("Click on a photo to delete it. Red border indicates deletable photos.");
    });
});
