/**
 *
 * @param {ProductRow} product
 * @constructor
 */
function ProductAmountSwitcher (product) {
    this.product = product;
    this.container = null;

    this.increase = function() {
        this.product.setAmount(product.amount + 1);
    };

    this.decrease = function() {
        this.product.setAmount(product.amount - 1);
    };

    this.getNode = function() {
        if(this.container) {
            return this.container;
        }

        var container = document.createElement('div');
        container.className = 'amountBox';

        container.innerHTML =
            '<span class="decrease">-</span>' +
            '<input type="text" value="1">' +
            '<span class="increase">+</span>';

        container.querySelector('.decrease').addEventListener('click', this.decrease.bind(this));
        container.querySelector('.increase').addEventListener('click', this.increase.bind(this));

        this.container = container;

        return container;
    };

    this.updateValue = function(newValue) {
        this.container.querySelector('input').value = newValue;
    }
}

export default  ProductAmountSwitcher;