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
