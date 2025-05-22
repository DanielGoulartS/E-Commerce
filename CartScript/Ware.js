export default class Ware{
    constructor(wName, wPrice, wAmount, wImages){
        this.name = wName;
        this.price = wPrice;
        this.amount = wAmount;
        this.images = wImages;
        this.formatedPrice = Ware.priceFormater(this.price);
    }

    showDescription(){
        var totalPrice = (this.price * this.amount);
        return "(" + this.amount + " Un) " + this.name +
        "\n--- Preço Unitário: " + this.formatedPrice + 
        "\n--- Preço Total: " + Ware.priceFormater(totalPrice);
    }

    static priceFormater(value){
        return value.toLocaleString("br", {style: "currency", currency: "BRL"});
    }
}