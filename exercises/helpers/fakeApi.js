const data = require('./data');

module.exports = {
    getCartItems() {
        return Promise.resolve(data.cart);
    }
};