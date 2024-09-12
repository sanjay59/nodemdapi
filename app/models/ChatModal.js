const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
    {
        chat_id : { type : Number, require : true },
        admin_id : { type : Number, require : true },
        message : { type : String, require : true }
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model("Chat", ChatSchema);