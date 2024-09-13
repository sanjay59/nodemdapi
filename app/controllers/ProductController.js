const Product = require("./../models/Product.js");
async function create(req,res){
        const {name, category, price} = req.body;
        if(!name || !category || !price) {
          res.status(400).json({message:"All field is required"});
        }
        try{
          
          const checkProduct = await Product.findOne({name});
          if(checkProduct){
            res.status(400).send({message:"Product already exists."});
          }
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

module.exports = {
    create,
}