// TODO: czy można przepisać ten obiekt w taki sposób aby nie trzeba było tworzyć za każdym razem jego instancji?
function ProductAmountSwitcher (product) {
    this.product = product;
    this.container = null;

    // TODO: zmienić miejsce deklaracji metod w taki sposób aby
    // podczas tworzenia instancji nie były tworzone kopie metod

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

        //TODO: zmień sposób deklaracji
        var container = document.createElement('div');
        container.className = 'amountBox';

        // TODO: zastąp łączenie stringów 'nowym szablonem'
        container.innerHTML =
            '<span class="decrease">-</span>' +
            '<input type="text" value="1">' +
            '<span class="increase">+</span>';

        // TODO: zastąp bind w taki sposób aby metody nadal były wywoływane w odniesieniu do this
        // Przykładowe wywołanie: this.decrease()
        container.querySelector('.decrease').addEventListener('click', this.decrease.bind(this) );
        container.querySelector('.increase').addEventListener('click', this.increase.bind(this));

        this.container = container;

        return container;
    };

    this.updateValue = function(newValue) {
        this.container.querySelector('input').value = newValue;
    }
}

export default  ProductAmountSwitcher;