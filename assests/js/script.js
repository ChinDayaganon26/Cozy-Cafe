let cart = [];

// =============================
// PAGE NAVIGATION
// =============================

function showPage(page) {

document.querySelectorAll(".page")
    .forEach(section => {

        section.classList.remove("active");

    });

document.getElementById(page)
    .classList.add("active");

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}

// =============================
// ADD TO CART
// =============================

function addToCart(name, price) {

const existing =
    cart.find(item => item.name === name);

if (existing) {

    existing.quantity++;

} else {

    cart.push({
        name: name,
        price: price,
        quantity: 1
    });

}

updateCart();

showToast(
    name + " added to cart ☕"
);

}

// =============================
// UPDATE CART
// =============================

function updateCart() {

let totalItems = 0;
let totalPrice = 0;

cart.forEach(item => {

    totalItems += item.quantity;

    totalPrice +=
        item.price * item.quantity;

});

document.getElementById("cartCount")
    .textContent = totalItems;

document.getElementById("total")
    .textContent = totalPrice;

document.getElementById("checkoutTotal")
    .textContent = totalPrice;


renderCart();

}

// =============================
// RENDER CART
// =============================

function renderCart() {

const container =
    document.getElementById("cartItems");

if (cart.length === 0) {

    container.innerHTML =
        `<p class="empty">
            Your cart is empty.
        </p>`;

    return;
}


let html = "";

cart.forEach((item, index) => {

    html += `

        <div class="cart-item">

            <div class="cart-item-name">

                <strong>
                    ${item.name}
                </strong>

                <br>

                ₱${item.price}

            </div>


            <div class="qty">

                <button
                    onclick="changeQuantity(${index},-1)">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index},1)">
                    +
                </button>

            </div>

        </div>

    `;

});

container.innerHTML = html;

}

// =============================
// CHANGE QUANTITY
// =============================

function changeQuantity(index, amount) {

cart[index].quantity += amount;

if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

}

updateCart();

}

// =============================
// OPEN CART
// =============================

function openCart() {

document.getElementById("cartModal")
    .style.display = "flex";

}

// =============================
// CLOSE CART
// =============================

function closeCart() {

document.getElementById("cartModal")
    .style.display = "none";

}

// =============================
// FILTER MENU
// =============================

function filterMenu(category) {

const cards =
    document.querySelectorAll(".menu-card");

cards.forEach(card => {

    if (
        category === "all" ||
        card.classList.contains(category)
    ) {

        card.style.display = "block";

        card.style.animation =
            "cardIn .5s ease";

    } else {

        card.style.display = "none";

    }

});

}

// =============================
// CHECKOUT
// =============================

function openCheckout() {

if (cart.length === 0) {

    showToast(
        "Your cart is empty! 🛒"
    );

    return;
}

closeCart();

document.getElementById("checkoutModal")
    .style.display = "flex";

}

function closeCheckout() {

document.getElementById("checkoutModal")
    .style.display = "none";

}

// =============================
// PLACE ORDER
// =============================

function placeOrder() {

const name =
    document.getElementById("customerName")
        .value.trim();

const payment =
    document.getElementById("payment")
        .value;


if (name === "") {

    alert(
        "Please enter your name."
    );

    return;
}


let total = 0;

let orderHTML = "";

cart.forEach(item => {

    const subtotal =
        item.price * item.quantity;

    total += subtotal;

    orderHTML += `

        <p>
            ${item.name}
            × ${item.quantity}
            — ₱${subtotal}
        </p>

    `;

});


document.getElementById("receiptDetails")
    .innerHTML = `

        <p>
            <strong>
                Customer:
            </strong>
            ${name}
        </p>

        <p>
            <strong>
                Payment:
            </strong>
            ${payment}
        </p>

        <hr>

        ${orderHTML}

        <hr>

        <h3>
            Total: ₱${total}
        </h3>

    `;


closeCheckout();

document.getElementById("receiptModal")
    .style.display = "flex";


cart = [];

updateCart();

}

// =============================
// CLOSE RECEIPT
// =============================

function closeReceipt() {

document.getElementById("receiptModal")
    .style.display = "none";

document.getElementById("customerName")
    .value = "";

}

// =============================
// TOAST MESSAGE
// =============================

function showToast(message) {

const toast =
    document.getElementById("toast");

toast.textContent = message;

toast.classList.add("show");

setTimeout(() => {

    toast.classList.remove("show");

}, 2000);

}