const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
  admin_id : { type : Number, require : true, unique : true},
  name : {type : String, required: true},
  email : { type : String, required : true},
  password : { type : String, required : true}
},
{
  timestamps : true
}
);

module.exports = mongoose.model("Admin", AdminSchema);
