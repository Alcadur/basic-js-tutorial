import '../scss/main.scss';
import ProductRow from './ProductRow';
import summaryService from './summaryService';

//TODO: naprawić zliczanie ilości elementów w koszyku
document.addEventListener('click', () => {
    const cart = document.querySelector('.cart');
    cart.dataset.count = (+cart.dataset.count + 1).toString();
});

const main = document.querySelector('main');

const product1 = new ProductRow(1, 'Bluzka we wzory', 59.99);
const product2 = new ProductRow(2, 'Góra od bikini', 49.99);
const product3 = new ProductRow(3, 'Sweter z efektem damage', 119.99);

appendUnderHeader(product1.getNode());
appendUnderHeader(product2.getNode());
appendUnderHeader(product3.getNode());

// TODO: sprawdzić czemu nie aktualizuje się cena w podsumowaniu
// Podpowiedź: w rozwiązaniu warto rozważyć wykorzystanie bind

summaryService.updateTotalPriceBy(product1, product2, product3);

function appendUnderHeader(productNode) {
    const header = main.querySelector('#afterLastProductRow');
    main.insertBefore(productNode, header);
}