const menu = document.querySelector(".nav-links");
const burger = document.querySelector("#burger");

const toggleMenu = () => {
	// Toggle menu
	menu.classList.toggle("menu-active");
	// Toggle close icon
	let isClose = burger.getAttribute("src").split("-");
	// Does the current image contain the string menu?
	isClose = isClose[isClose.length - 1].indexOf("menu");

	if (isClose >= 0) {
		burger.setAttribute("src", "./images/icon-close.svg");
	} else {
		burger.setAttribute("src", "./images/icon-menu.svg");
	}
};

burger.addEventListener("click", toggleMenu);

const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const amount = document.querySelector(".amount");

minus.addEventListener("click", () => {
	if (amount.value > 1) amount.value--;
});
plus.addEventListener("click", () => {
	amount.value++;
});

// Cart
const cart = [];
const add_btn = document.querySelector(".add-item-btn");
const cart_items_box = document.querySelector(".cart-items");

add_btn.addEventListener("click", addItemToCart);

function addItemToCart() {
	const newItem = {
		id: 0,
		name: "Fall Limited Edition Sneakers",
		price: 125,
		amount: getAmount(),
		img: "./images/image-product-1-thumbnail.jpg",
	};
	// Add newItem to the cart array
	cart.push(newItem);
	// Fill the cart items box with the items
	// being in the cart
	displayCartItems();
	// Give feedback to the user about their action
	alert(`${newItem.amount} item(s) has been added to your cart!`);
	// Reset the to amount
	amount.value = 1;
}

function getAmount() {
	if (amount.value > 0) {
		return amount.value;
	} else {
		alert("The amount is too low.");
		exit();
	}
}

function displayCartItems() {
	// Empty the box
	cart_items_box.innerHTML = "";
	// Fill the box with items
	cart.forEach((item) => {
		cart_items_box.innerHTML += createHtml(item);
	});
	// Show "empty cart" or "Checkout button" based
	// on the cart length
	showRelatedCartElement();
}

// Create cart items
function createHtml(item) {
	return `<div class="cart-item">
    <div class="item-info">
        <img
            class="item-img"
            src="${item.img}"
            alt="product-pic"
        />
        <div class="item-desc">
            <p class="item-name">
                ${item.name}
            </p>
            <p>
                <span>$${item.price} x ${item.amount}</span>
                <span class="item-final"
                    >$${item.price * item.amount}</span
                >
            </p>
        </div>
    </div>
    <img
        class="delete-img"
        src="./images/icon-delete.svg"
        alt="delete"
        onclick="deleteItem(${item.id})"
        />
    </div>`;
}

// Delete item with the specific ID
function deleteItem(id) {
	console.log(id);
	cart.splice(id, 1);
	displayCartItems();
}

function showRelatedCartElement() {
	if (cart.length > 0) {
		cart_items_box.innerHTML +=
			'<button class="checkout-btn">Checkout</button>';
	} else {
		cart_items_box.innerHTML =
			'<h3 class="gray empty">Your cart is empty.</h3>';
	}
}

// When the page loads the cart's length is gonna
// be 0 so the empty cart message will appear
// in the cart box.
showRelatedCartElement();

// Gallery
const selected_img = document.querySelector(".selected-img");
const prev = document.querySelector(".prev-arrow");
const next = document.querySelector(".next-arrow");
const thumbnails = Array.from(document.querySelectorAll(".thumbnails img"));
const thumbImgParents = thumbnails.map((th) => th.parentElement);
let curr_img_index = 1;

prev.addEventListener("click", showPrev);
next.addEventListener("click", showNext);

function showPrev() {
	if (curr_img_index == 1) {
		selected_img.setAttribute("src", `images/image-product-4.jpg`);
		curr_img_index = 4;
	} else {
		selected_img.setAttribute(
			"src",
			`images/image-product-${curr_img_index - 1}.jpg`
		);
		curr_img_index--;
	}
	// Add class to the thumbnail with the same ID as the
	// currently selected img.
	updateThumbnail(thumbnails[curr_img_index - 1]);
}

function showNext() {
	if (curr_img_index == 4) {
		selected_img.setAttribute("src", `images/image-product-1.jpg`);
		curr_img_index = 1;
	} else {
		selected_img.setAttribute(
			"src",
			`images/image-product-${curr_img_index + 1}.jpg`
		);
		curr_img_index++;
	}
	updateThumbnail(thumbnails[curr_img_index - 1]);
}

thumbnails.forEach((th) =>
	th.addEventListener("click", () => {
		updateThumbnail(th);
	})
);

function updateThumbnail(th) {
	selectThumbnail(th);
	addThumbClass(th);
}

function selectThumbnail(th) {
	// Get thumbnail ID
	let thId = th.getAttribute("src").split("-")[2];
	// Set img with the same ID
	selected_img.setAttribute("src", `images/image-product-${thId}.jpg`);
	// Set the current image index to the selected image's index
	curr_img_index = thId;
}

function addThumbClass(th) {
	// Remove active classes
	thumbImgParents.forEach((item) => item.classList.remove("selected-thumb"));
	// Add class to the active thumbnail
	th.parentElement.classList.add("selected-thumb");
}
