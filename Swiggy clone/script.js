const foods = [
  { id: 1, name: "Veg Burger", price: 120, img: "C:\\Users\\User\\OneDrive\\Desktop\\Swiggy clone\\burger.jpg" },
  { id: 2, name: "Pizza", price: 250, img: "C:\\Users\\User\\OneDrive\\Desktop\\Swiggy clone\\pizza.jpeg" },
  { id: 3, name: "Pasta", price: 180, img: "C:\\Users\\User\\OneDrive\\Desktop\\Swiggy clone\\pasta.jpg" },
  { id: 4, name: "Biryani", price: 200, img: "C:\\Users\\User\\OneDrive\\Desktop\\Swiggy clone\\biryani.jpg" },
  { id: 5, name: "Sandwich", price: 90, img: "C:\\Users\\User\\OneDrive\\Desktop\\Swiggy clone\\sandwich.jpg" }, 
  { id: 6, name: "Salad", price: 80, img: "C:\\Users\\User\\OneDrive\\Desktop\\Swiggy clone\\salad.jpg" },
  { id: 7, name: "Fries", price: 60, img: "C:\\Users\\User\\OneDrive\\Desktop\\Swiggy clone\\fries.jpg" },
  { id: 8, name: "Ice Cream", price: 50, img: "C:\\Users\\User\\OneDrive\\Desktop\\Swiggy clone\\icecream.jpg" },
  { id: 9, name: "Cake", price: 100, img: "C:\\Users\\User\\OneDrive\\Desktop\\Swiggy clone\\cake.jpg" },
];

const container = document.getElementById("food-container");

function displayFoods(list) {
  container.innerHTML = "";

  list.forEach(food => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${food.img}">
      <h4>${food.name}</h4>
      <p>₹${food.price}</p>
      <button onclick="addToCart(${food.id})">Add</button>
    `;

    container.appendChild(card);
  });
}

displayFoods(foods);

let cart = [];

function addToCart(id) {
  const item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
  } else {
    const food = foods.find(f => f.id === id);
    cart.push({ ...food, qty: 1 });
  }

  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalItems = document.getElementById("total-items");
  const totalPrice = document.getElementById("total-price");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <span>${item.name}</span>
      <div>
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
        ${item.qty}
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    `;

    cartItems.appendChild(div);
  });

  totalItems.innerText = count;
  totalPrice.innerText = total;
  cartCount.innerText = count;
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);

  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  updateCart();
}
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = foods.filter(f =>
    f.name.toLowerCase().includes(value)
  );

  displayFoods(filtered);
});