const mongoose = require("mongoose");

const WishListProduct = new mongoose.Schema({

    userId: {
        type: String,
        ref: 'User'
    },
    wishlist: [{ type: mongoose.Schema.ObjectId, ref: 'allProduct' }]

});


module.exports = mongoose.model('wishlist', WishListProduct);