const mongoose = require("mongoose");
const OrderSshema = mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId},
    product_id:{type:mongoose.Schema.Types.ObjectId},
    quantity:{type:Number}
},{
    timestamps:true
});

module.exports = mongoose.model('Order',OrderSshema);