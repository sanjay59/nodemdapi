const Product = require("./../models/Product.js");
const CartItem = require("./../models/CartItem.js");
const Order = require("./../models/Order.js");

async function create(req,res){
        const {name, category, price} = req.body;
        if(!name || !category || !price) {
          res.status(400).json({message:"All field is required"});
        }
        try{
          
        //   const checkProduct = await Product.findOne({name});
        //   if(checkProduct){
        //     res.status(400).send({message:"Product already exists."});
        //   }
          // const salt = await bcrypt.genSalt(10);
          // const hashedPassword = await bcrypt.hash(password, salt);
          const newProduct = new Product({
            name,category,price
          });      
          await newProduct.save();
          res.status(201).send({status:true,message:"Product created successfully.",result:newProduct});
        }catch(error){
            res.status(500).send({message:error});
        } 

}

async function cartItem(req,res){
    const {user_id, product_id, quantity} = req.body;
    if(!user_id || !product_id || !quantity) {
      res.status(400).json({message:"All field is required"});
    }
    try{
      const newCartItem = new CartItem({
        user_id,product_id,quantity
      });      
      await newCartItem.save();
      res.status(201).send({status:true,message:"Cart Item created successfully.",result:newCartItem});
    }catch(error){
        res.status(500).send({message:error});
    } 

}

async function getCartItem(req,res){
    const user_id = req.params.user_id;
    if(!user_id) {
        try{
            // const newCartItem = await CartItem.find();      
            const newCartItem = await CartItem.find();
            res.status(200).send({status:true,message:"Cart Item list get successfully.",result:newCartItem});
          }catch(error){
              res.status(500).send({message:error});
          }
    }
    try{
        const newCartItem = await CartItem.aggregate([{
            $lookup:{
                from : "users",
                localField : "user_id",
                foreignField : "_id",
                as : "userDetails"
            }
        },{$project:{
            user_id:1,product_id:1,quantity:1,"userDetails.name":1,"userDetails.email":1,"userDetails.phone_number":1
        }}]);      
      res.status(200).send({status:true,message:"Cart Item list get successfully.",result:newCartItem});
    }catch(error){
        res.status(500).send({message:error});
    } 

}

async function createOrder(req,res){
    const {user_id,product_id,quantity} = req.body;
    if(!user_id || !product_id || !quantity){
        res.status(400).send({message:"All field is required."});
    }
    try{
        const createOrder = new Order({
            user_id,product_id,quantity
        });
        await createOrder.save();
    res.status(201).send({message:"Order created successfully.",result:createOrder});
    }catch(error){
        res.status(500).send({message:error});
    }
}

async function getOrder(req, res){
    res.status(200).send({message:"Order get successfully."});
}

module.exports = {
    create,cartItem,getCartItem,createOrder,getOrder
}