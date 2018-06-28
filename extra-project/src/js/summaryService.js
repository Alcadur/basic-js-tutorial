const summaryService = {
    updateTotalPriceBy: function (product1, product2, product3) {
        var totalPrice = 0;
        totalPrice += product1.getTotalPrice();
        totalPrice += product2.getTotalPrice();
        totalPrice += product3.getTotalPrice();

        document.querySelector('.total-price').textContent = totalPrice.toString();
    },
    /**
     * ustawiane w index.js
     */
    updateTotalPriceByBind: {}
};

export default summaryService;