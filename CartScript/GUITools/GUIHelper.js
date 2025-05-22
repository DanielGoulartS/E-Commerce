export default class GUIHelper {
    constructor() {
    }

    static createButton(text, onClick) {
        let bt = document.createElement("input");
        bt.setAttribute("type", "button");
        bt.setAttribute("value", text);
        bt.addEventListener("click", onClick);
        return bt;
    }

    static createElement(elementTag, className, elementType, innerHTML) {
        let element = document.createElement(elementTag);
        element.className = className;

        if (elementType != undefined && elementType.length != 0) {
            element.setAttribute("type", elementType);
        }

        if (innerHTML != undefined) {
            element.innerHTML = innerHTML;
        }

        return element;
    }

    static createImageSlider(imageSrc) {
        let index = 0;
        let container = GUIHelper.createElement("div", "sliderContainer");
        let image = GUIHelper.createElement("img", "sliderImage");
        let left = GUIHelper.createButton("<", () => {
            if (index > 0) {
                index--; image.setAttribute("src", imageSrc[index]);
            } else {
                index = imageSrc.length - 1; image.setAttribute("src", imageSrc[index])
            }
        });
        let right = GUIHelper.createButton(">", () => {
            if (index < imageSrc.length - 1) {
                index++; image.setAttribute("src", imageSrc[index])
            } else {
                index = 0; image.setAttribute("src", imageSrc[index])
            }
        });

        //PONHA-ME NO CSS
        left.style.width = "50%";
        right.style.width = "50%";
        image.style.maxWidth = "100%";
        image.setAttribute("src", imageSrc[index]);
        //PONHA-ME NO CSS

        container.insertAdjacentElement("beforeend", left);
        container.insertAdjacentElement("beforeend", right);
        container.insertAdjacentElement("beforeend", image);
        return container;
    }

    static createPopUp(message, imageURL) {
        let panel = GUIHelper.createElement("div", "popUpBlockerPanel");
        let card = GUIHelper.createElement("div", "popUpMessagePanel");
        let warning = GUIHelper.createElement("p", "popUpWarning", "", message);

        panel.style.display = "block";
        panel.style.position = "fixed";
        panel.style.zIndex = 1;
        panel.style.top = "0";
        panel.style.left = "0";
        panel.style.width = "100%";
        panel.style.height = "100%";
        panel.style.overflow = "auto";
        panel.style.background = "rgba(0,0,0,0.5)";
        
        card.style.alignContent= "center";
        card.style.background = "rgb(109, 109, 109)";
        card.style.textAlign = "center";
        card.style.width = "50%";
        card.style.height = "90%";
        card.style.margin = "auto";
        card.style.overflow = "auto";

        if (imageURL != undefined && imageURL.length > 0) {
            let image = GUIHelper.createElement("img", "popUpImage");
            image.setAttribute("src", imageURL);
            image.style.display = "block";
            image.style.margin = "auto";
            image.style.maxWidth = "50%";
            card.insertAdjacentElement("beforeend", image);
        }

        card.insertAdjacentElement("beforeend", warning);
        panel.insertAdjacentElement("beforeend", card);
        return panel;
    }
}