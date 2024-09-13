const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name:{type:String},
        category:{type:String},
        price:{type:String},
    },{
        timestamps:true
    }
);

module.exports = mongoose.model('Product', ProductSchema);