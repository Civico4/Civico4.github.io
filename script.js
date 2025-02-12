

let db;
let isScrolling = false;

function checkScroll() {
  const scrollButton = document.getElementById("scrollButton");

  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;

  if (scrollY > viewportHeight) {
    scrollButton.style.visibility = "visible";
    scrollButton.style.opacity = "1";
} else {
  scrollButton.style.opacity = "0";
  setTimeout(() => {
      if (scrollButton.style.opacity === "0") {
          scrollButton.style.visibility = "hidden";
      }
  }, 300); // Matches transition time
}
isScrolling = false;
}

// fetch database

function fetchDb() {
  
  fetch('./assets/db.json')
  .then(response => response.json())
  .then(data => {
    db = data;
  
    console.log(db.menu);
    localStorage.setItem("menuCivico", JSON.stringify(db)); // Store data
    displayMenu(Array.from(db.menu));
    checkScroll();
    window.addEventListener("scroll", function () {
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(checkScroll);
      }
      });
  })
  .catch(error => console.error('Error loading JSON:', error));

}

// ready state 

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", fetchDb);
} else {
  // `DOMContentLoaded` has already fired
  fetchDb();
}

// render items
function displayMenu(menuData) {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = ""; // Clear previous content

  menuData.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('accordion');
    categoryDiv.textContent = category.label;
    categoryDiv.style.backgroundImage = `url('./images/${category.image}')`;
    
    const itemsDiv = document.createElement('div');
    itemsDiv.classList.add('panel');
    
    category.items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('menu-item');
      
      const nameDiv = document.createElement('div');
      nameDiv.classList.add('menu-item-name');
      if (item.details !== '') {
        nameDiv.innerHTML = `<strong>${item.name}</strong><br><div class='details'>${item.details}</div>`;
      } else {
        nameDiv.innerHTML = `<strong>${item.name}</strong>`;
      }
      
      
      const priceDiv = document.createElement('div');
      priceDiv.classList.add('menu-item-price');
      priceDiv.innerHTML = `${item.price}`;
      priceDiv.style.textAlign = 'right';
      
      itemDiv.appendChild(nameDiv);
      itemDiv.appendChild(priceDiv);
        itemsDiv.appendChild(itemDiv);
    });
    
    categoryDiv.addEventListener('click', function() {
      if (itemsDiv.style.maxHeight) {
        itemsDiv.style.maxHeight = null;
        itemsDiv.style.padding = '0';
    } else {
        itemsDiv.style.maxHeight = itemsDiv.scrollHeight + 'px';
        itemsDiv.style.padding = '0';
        categoryDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    });
    
    menuContainer.appendChild(categoryDiv);
    menuContainer.appendChild(itemsDiv);
});
    /*
      const menuItem = document.createElement("div");
      menuItem.classList.add("menu-item");

      menuItem.innerHTML = `
          <h2>${item.name}</h2>
          <p>${item.details}</p>
          <span class="price">$${item.price}</span>
      `;

      menuContainer.appendChild(menuItem);
      */
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelectorAll('.panel').forEach(panel => {
      panel.style.maxHeight = null;
      panel.style.padding = '0';
  });
}


