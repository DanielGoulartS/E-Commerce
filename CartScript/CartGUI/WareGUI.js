import Ware from "../Ware.js";
import CartManager from "../CartManager.js";
import GUIHelper from "../GUITools/GUIHelper.js";
export default class WareGUI {
    constructor(ware) {
        this.ware = ware;
        this.ware.amount = 0;
        this.div = undefined;
        this.pName = undefined;
        this.pPrice = undefined;
        this.pAmount = undefined;
        this.slider = undefined;
    }

    createInterface() {
        this.div = GUIHelper.createElement("div", "wareContainer");
        this.pName = GUIHelper.createElement("p", "wareName", "", this.ware.name);
        this.pPrice = GUIHelper.createElement("p", "warePrice", "", this.ware.formatedPrice + " (Un)");
        this.pAmount = GUIHelper.createElement("p", "wareAmount", "", 0);
        this.slider = GUIHelper.createImageSlider(this.ware.images);

        this.div.insertAdjacentElement("beforeend", this.slider);
        this.div.insertAdjacentElement("beforeend", this.pName);
        this.div.insertAdjacentElement("beforeend", this.pPrice);
        this.div.insertAdjacentElement("beforeend", this.pAmount);
        this.div.insertAdjacentElement("beforeend",
            GUIHelper.createButton("-", () => { this.decrease(); })
        );
        this.div.insertAdjacentElement("beforeend",
            GUIHelper.createButton("+", () => { this.increase(); })
        );
        this.div.insertAdjacentElement("beforeend",
            GUIHelper.createButton("Modificar Carrinho", () => { this.order(); }));
        return this.div;
    }

    insertInterface(component){
        component.insertAdjacentElement("afterbegin", this.createInterface());
    }

    decrease() {
        --this.ware.amount;
        this.pAmount.innerHTML = this.ware.amount;
    }

    increase() {
        ++this.ware.amount;
        this.pAmount.innerHTML = this.ware.amount;
    }

    order() {
        CartManager.insertItem(new Ware(this.ware.name, this.ware.price, this.ware.amount, this.ware.images));
        this.ware.amount = 0;
        this.pAmount.innerHTML = 0;
    }
}