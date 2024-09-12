const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema(
    {
        admin_id : {type:String, require : true, unique : true},
        img : { type : Buffer}
    },
    {
        timestamps : true
    }
);
module.exports = mongoose.model("Profile", ProfileSchema);