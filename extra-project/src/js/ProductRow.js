import ProductAmountSwitcher from './ProductAmountSwitcher';
import summaryService from './summaryService';

function ProductRow (productId, productName, price) {
    this.id = productId;
    this.price =  price;
    this.name = productName;
    this.amount = 1;
    this.container = null;
    this.switcher = new ProductAmountSwitcher(this);
}

ProductRow.prototype.getNode = function () {
    if(this.container) {
        return this.container;
    }

    const productImg = require('../assets/products/product-' + this.id + '.jpg');
    const productColorImg = require('../assets/products/product-' + this.id + '-color.jpg');
    const section = document.createElement('section');
    section.className = 'row';
    section.innerHTML =
        '            <div class="cell-checkbox"><input type="checkbox"></div>' +
        '            <div class="cell-1"><img src="' + productImg + '" alt="product"></div>' +
        '            <div class="cell-2"> ' + this.name + ' <br> 12345-xxx-ll</div>' +
        '            <div class="cell-1 remove">Usuń</div>' +
        '            <div class="cell-1 column">' +
        '                <div>Kolor: <img src="' + productColorImg + '" alt="color" class="color"></div>' +
        '                <div>Rozmiar: XL</div>' +
        '            </div>' +
        '            <div class="cell-1 product-amount-switcher"></div>' +
        '            <div class="cell-1"><span class="price">' + this.price + '</span>&nbsp;<span class="currency">pln</span></div>';
    
    section.querySelector('.product-amount-switcher').appendChild(this.switcher.getNode());
    this.container = section;

    return section;
};

ProductRow.prototype.setAmount  = function(newAmount) {
    this.amount  = newAmount;
    this.updateTotalPrice();
    summaryService.updateTotalPriceByBind();
    this.switcher.updateValue(this.amount);
};

ProductRow.prototype.updateTotalPrice = function() {
    this.container.querySelector('.price').textContent = this.getTotalPrice();
};

ProductRow.prototype.getTotalPrice = function() {
    return this.price * this.amount
};

export default ProductRow;

