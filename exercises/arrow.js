const checker = require('./helpers/checker');
const fakeApi = require('./helpers/fakeApi');

// napisz 2 metody, pierwsza getNeighbors powinna zwracać planety z którymi sąsiaduje ziemia (w tabeli)
// druga getNextPlanets powinna zwracać wszystkie planety które są za ziemią
// obie metody powinny być zadeklarowane przy użyciu skróconej składni (nie arrow function)

const univers = {
    planets: ['Merkury', 'Venus', 'Ziemia', 'Mars', 'Jowisz', 'Saturn', 'Uran', 'Neptun'],
};

checker.arrow.methods(univers);

// zmień metodę countTotalPrice w taki sposób aby poprawnie naliczała wartość totalPrice

const order = {
    profitMargin: .12,
    totalPrice: 0,
    countTotalPrice() {
        return fakeApi.getCartItems().then(function(items) {
            let sum = 0;
            items.forEach(function(item) {
                sum += item.basePrice;
            });

            this.totalPrice = sum * (1 + this.profitMargin);

            return this;
        });
    }
};


checker.arrow.totalPrice(order);