import CartGUI from "./CartGUI/CartGUI";
import GUIHelper from "./GUITools/GUIHelper";
import Ware from "./Ware";
import WareGUI from "./CartGUI/WareGUI";

export default class CartManager {
    constructor(contactAddress) {
        CartManager.contactAddress = contactAddress;
        CartManager.cart = [];
        CartManager.totalPrice = Ware.priceFormater(0);
        CartManager.orderCode = undefined;
        CartManager.cartGUI = new CartGUI();
    }

    createInterface(catalogComponent) {
        this.loadWares(catalogComponent);
        return CartManager.cartGUI.createInterface();
    }

    static insertItem(ware) {

        if (ware.amount === 0) {
            return;
        }

        CartManager.cart.forEach(element => {
            if (element.name == ware.name) {
                element.amount += ware.amount;
                ware.amount = 0;
            }
        });

        if (ware.amount !== 0) {
            CartManager.cart.push(ware);
        }

        let count = 0;
        CartManager.cart.forEach(element => {
            if (element.amount <= 0) {
                CartManager.cart.splice(count, 1);
            }
            ++count;
        });

        CartManager.calcTotalPrice();

        CartManager.cartGUI.refresh();
    }

    static removeItem(ware) {
        let count = 0;
        CartManager.cart.forEach(element => {
            if (element.name == ware.name) {
                element.amount -= ware.amount;
                if (element.amount <= 0) {
                    CartManager.cart.splice(count, 1);
                }
            }
            ++count;
        });

        CartManager.calcTotalPrice();

        CartManager.cartGUI.refresh();
    }

    static calcTotalPrice() {
        let total = 0;
        CartManager.cart.forEach(element => {
            total += (element.price * element.amount);
        });

        CartManager.totalPrice = Ware.priceFormater(total);
    }

    loadWares(component) {
        let xhttp = new XMLHttpRequest();

        xhttp.onload = function () {
            //DEBUG TEST
            //document.body.insertAdjacentHTML("beforebegin", this.responseText);

            let catalog = JSON.parse(this.responseText);

            for (let i = 0; i < catalog.wares.length; i++) {
                var ware1 = new WareGUI(new Ware(
                    catalog.wares[i].name,
                    catalog.wares[i].price,
                    undefined,
                    catalog.wares[i].images));
                ware1.insertInterface(component);
            }

        };

        xhttp.open("GET", "./PHPHandlers/cartStarter.php");
        xhttp.send();

    }

    static createOrder() {
        this.checkOrderCodeAvailability();
    }

    static checkOrderCodeAvailability() {

        //CONFIRA O PROCESSAMENTO DO PEDIDO EM ONLOAD
        document.body.insertAdjacentElement("afterbegin",
            GUIHelper.createPopUp("Aguarde o processamento.", "./Media/loading.gif"));

        CartManager.orderCode = Math.random().toString(36).substr(2, 2) + Date.now().toString(36);
        let xhttp = new XMLHttpRequest();

        xhttp.onload = function () {
            // "false" Confirmation
            // console.log(this.responseText);
            if (this.responseText != "false") {
                CartManager.checkOrderCodeAvailability();
                return undefined;
            } else {
                setTimeout(() => { CartManager.sendOrder() }, 3000);
            }
        };

        xhttp.open("GET", "./PHPHandlers/orderCodeConfirmation.php?orderCode=" + CartManager.orderCode);
        xhttp.send();
    }

    static sendOrder() {
        let xhttp = new XMLHttpRequest();

        xhttp.onload = function () {
            var failure = "Adicione mercadorias ao carrinho para efetuar alguma compra!";
            if (this.responseText.includes(failure)) {
                window.alert(this.responseText);
                document.body.removeChild(document.querySelector(".popUpBlockerPanel"));
            } else {
                document.body.removeChild(document.querySelector(".popUpBlockerPanel"));

                let popUpMessage = "Pedido enviado!<br> " +
                    "ANOTE SEU CÓDIGO" + String.fromCodePoint(128073) + " '" + this.responseText + "' " +
                    "<br>Envie-nos o CÓDIGO acima por WhatsApp clicando no acesso abaixo." +
                    "<br>Para sua segurança: <br>" +
                    String.fromCodePoint(10004) + "Realize o pagamento APENAS APÓS SOLICITADO<br>" +
                    String.fromCodePoint(10004) + "Confirme o endereço de entrega APENAS APÓS SOLICITADO!" +
                    "<br>Obrigado pela preferência!";
                let confirmationText = "Olá+!+Quero+confirmar+meu+pedido+de+código " +
                    "[" + this.responseText + "].";
                let panel = GUIHelper.createPopUp(popUpMessage);

                document.body.insertAdjacentElement("afterbegin", panel);

                document.querySelector(".popUpMessagePanel").insertAdjacentElement("beforeend",
                    GUIHelper.createButton("Confirmar", () => {
                        window.open("https://wa.me/" + CartManager.contactAddress + "?text=" + 
                            confirmationText, "_blank").focus();
                    }));

                document.querySelector(".popUpMessagePanel").insertAdjacentElement("beforeend",
                    GUIHelper.createButton("×", () => { document.body.removeChild(panel); }));
            }
        }

        let URLWares = "";
        let countedTotalPrice = 0;
        let i = 0;
        CartManager.cart.forEach(element => {
            URLWares += "&w" + i + "=" + element.name + "&w" + i + "a=" + element.amount;
            countedTotalPrice += Number(element.amount * element.price);
            i++;
        });

        xhttp.open("GET", "./PHPHandlers/orderConcluder.php?code=" + CartManager.orderCode +
            "&totalPrice=" + countedTotalPrice + URLWares);
        xhttp.send();
    }
}