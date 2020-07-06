const menuButton = document.querySelector(".hamburger")
const closeButton = document.querySelector(".menu-fs__close-button")
const fsMenu = document.querySelector(".menu-fs")

const showMenu = function () {
  fsMenu.style.display = "flex"
}

const hideMenu = function () {
  fsMenu.style.display = "none"
}

menuButton.addEventListener("click", showMenu)
closeButton.addEventListener("click", hideMenu)
