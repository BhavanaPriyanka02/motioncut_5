const menuItems = [
    { name: "Vegetable Curry", price: 100 },
    { name: "Chicken Tikka Masala", price: 200 },
    { name: "Dal Makhani", price: 70 },
    { name: "Paneer Butter Masala", price: 170 },
    { name: "Biryani", price: 250 },
    { name: "Naan Bread", price: 50 },
  ]
  
  const reviews = [
    { name: "Srithi", rating: 5, comment: "Delicious food and great service!" },
    { name: "Priyanka", rating: 5, comment: "Tasty meals, but delivery was a bit late." },
    { name: "Kushali", rating: 5, comment: "Authentic taste, just like homemade!" },
  ]
  
  let cart = []
  
  const menuContainer = document.getElementById("menuItems")
  const reviewContainer = document.getElementById("reviewList")
  const loginBtn = document.getElementById("loginBtn")
  const loginModal = document.getElementById("loginModal")
  const reviewModal = document.getElementById("reviewModal")
  const addReviewBtn = document.getElementById("addReviewBtn")
  const cartItemsContainer = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")
  const checkoutBtn = document.getElementById("checkoutBtn")
  
  function displayMenu() {
    menuContainer.innerHTML = ""
    menuItems.forEach((item) => {
      const menuItem = document.createElement("div")
      menuItem.classList.add("menu-item")
      menuItem.innerHTML = `
              <h3>${item.name}</h3>
              <p>₹${item.price.toFixed(2)}</p>
              <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
          `
      menuContainer.appendChild(menuItem)
    })
  }
  
  function displayReviews() {
    reviewContainer.innerHTML = ""
    reviews.forEach((review) => {
      const reviewElement = document.createElement("div")
      reviewElement.classList.add("review")
      reviewElement.innerHTML = `
              <h3>${review.name}</h3>
              <p>Rating: ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
              <p>${review.comment}</p>
          `
      reviewContainer.appendChild(reviewElement)
    })
  }
  
  function addToCart(name, price) {
    cart.push({ name, price })
    updateCart()
  }
  
  function updateCart() {
    cartItemsContainer.innerHTML = ""
    let total = 0
    cart.forEach((item) => {
      const li = document.createElement("li")
      li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`
      cartItemsContainer.appendChild(li)
      total += item.price
    })
    cartTotal.textContent = total.toFixed(2)
  }
  
  function openModal(modal) {
    modal.style.display = "block"
  }
  
  function closeModal(modal) {
    modal.style.display = "none"
  }
  
  loginBtn.onclick = () => openModal(loginModal)
  addReviewBtn.onclick = () => openModal(reviewModal)
  
  document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.onclick = () => closeModal(closeBtn.closest(".modal"))
  })
  
  window.onclick = (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target)
    }
  }
  
  document.getElementById("loginForm").onsubmit = (e) => {
    e.preventDefault()
    alert("Login successful!")
    closeModal(loginModal)
  }
  
  document.getElementById("reviewForm").onsubmit = (e) => {
    e.preventDefault()
    const name = e.target.elements[0].value
    const rating = Number.parseInt(e.target.elements[1].value)
    const comment = e.target.elements[2].value
    reviews.push({ name, rating, comment })
    displayReviews()
    closeModal(reviewModal)
  }
  
  checkoutBtn.onclick = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!")
    } else {
      alert("Thank you for your order!")
      cart = []
      updateCart()
    }
  }
  
  displayMenu()
  displayReviews()
  
  