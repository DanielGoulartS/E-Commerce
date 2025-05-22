import Ware from "../Ware";
import GUIHelper from "../GUITools/GUIHelper.js";
import CartManager from "../CartManager.js";

export default class CartsWareGUI {
    constructor(ware) {
        this.ware = ware;
        this.container = undefined;
        this.image = undefined;
        this.pName = undefined;
        this.pAmount = undefined;
        this.pPrice = undefined;
        this.bt = undefined;
        return this.createInterface();
    }

    createInterface() {
        this.container = GUIHelper.createElement("div", "cartsWareContainer");

        this.image = GUIHelper.createElement("img", "cartsWareImage");
        this.image.setAttribute("src", this.ware.images[0]);

        this.pName = GUIHelper.createElement("p", "cartsWareName", "", this.ware.name);

        this.pAmount = GUIHelper.createElement("p", "cartsWareAmount", "", this.ware.amount + " Un");

        this.pPrice =
            GUIHelper.createElement("p", "cartsWarePrice", "", Ware.priceFormater(this.ware.price) + "/Un");

        this.pTPrice = GUIHelper.createElement("p",
            "cartsWareTotalPrice",
            "",
            "Total: " + Ware.priceFormater(Number(this.ware.price * this.ware.amount)));

        this.bt = GUIHelper.createButton("Delete", () => { CartManager.removeItem(this.ware) });

        this.container.insertAdjacentElement("beforeend", this.image);
        this.container.insertAdjacentElement("beforeend", this.pName);
        this.container.insertAdjacentElement("beforeend", this.pPrice);
        this.container.insertAdjacentElement("beforeend", this.pAmount);
        this.container.insertAdjacentElement("beforeend", this.pTPrice);
        this.container.insertAdjacentElement("beforeend", this.bt);
        return this.container;
    }
}