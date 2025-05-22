import CartManager from "./CartManager.js";

var cart = new CartManager("5521975186050");
var container = document.querySelector("#scriptContainer");
container.insertAdjacentElement("beforeend", cart.createInterface(container));