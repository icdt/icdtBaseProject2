app.service('GlobalService', function () {

    this.selectedProduct = null;

    this.selectedOrder = null;

    this.selectedBill = null;

    this.selectedObj = null;

    this.selectedCustomer = null;

    this.OrderList = null;
    this.OrderList_Start = null;
    this.OrderList_End = null;

    this.EeventList = null;
    this.EeventList_Start = null;
    this.EeventList_End = null;

    this.theVOU_SALE = null;

    this.cart = [];

    this.addToCart = function(item){
        if (this.cart == null) {
            this.cart = [];
        }

        this.cart.push(item);
    };

    this.getCart = function () {
        return this.cart;
    };

    this.resetCart = function () {
        this.cart = [];
    };

});