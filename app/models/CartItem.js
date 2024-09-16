const mongoose = require('mongoose');

const CartItemSchema = mongoose.Schema(
    {
        user_id:{type:mongoose.Schema.Types.ObjectId},
        product_id:{type:mongoose.Schema.Types.ObjectId},
        quantity:{type:Number}
    },{
        timestamps:true
    }
);

module.exports = mongoose.model('CartItem', CartItemSchema);