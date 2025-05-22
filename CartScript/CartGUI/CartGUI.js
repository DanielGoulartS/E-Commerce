import CartManager from "../CartManager.js";
import GUIHelper from "../GUITools/GUIHelper.js";
import CartsWareGUI from "./CartsWareGUI.js";
export default class CartGUI {
    constructor() {
        this.panel = undefined;
        this.panelTitle = undefined;
        this.scrollPanel = undefined;
        this.panelTotalPrice = undefined;
        this.btEnviar = undefined;
    }

    createInterface() {
        this.panel = GUIHelper.createElement("div", "cartPanel");

        this.panelTitle = GUIHelper.createElement("p", "panelTitle", "", "Carrinho");

        this.scrollPanel = GUIHelper.createElement("div", "scrollPanel");

        this.panelTotalPrice =
            GUIHelper.createElement("p", "panelTotalPrice", "", "Total: " + CartManager.totalPrice);

        this.btEnviar = GUIHelper.createButton("Realizar Pedido", () => { CartManager.createOrder() });

        this.panel.insertAdjacentElement("beforeend", this.panelTitle);
        this.panel.insertAdjacentElement("beforeend", this.scrollPanel);
        this.panel.insertAdjacentElement("beforeend", this.panelTotalPrice);
        this.panel.insertAdjacentElement("beforeend", this.btEnviar);
        return this.panel;

    }

    refresh() {
        this.scrollPanel.innerHTML = "";
        this.showList();
        this.panelTotalPrice.innerHTML = "Total: " + CartManager.totalPrice;
    }

    showList() {
        //GUI Print

        CartManager.cart.forEach(element => {
            this.scrollPanel.insertAdjacentElement("beforeend", new CartsWareGUI(element));
        });

        /* //Console Print
        console.clear();
        CartManager.cart.forEach(element => {
            console.log(element.showDescription());
        });
        console.log("-----Preço Total: " + CartManager.totalPrice + "-----");
        */
    }
}