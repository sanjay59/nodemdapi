const Chat = require("../models/ChatModal");

function send(req, res)
{
    Chat.find()
    .sort({ chat_id: -1 }).limit(1)
    .then((data) => {
      next_id = 1;
      if (data != '') {
        next_id = data[0].chat_id + 1;
      }
      const objData = new Chat({
        chat_id: next_id,
        admin_id: req.body.admin_id,
        message: req.body.message,
      });
      objData.save().then((data) => {
        res.send({ status: true, message: 'Created', result: data })
      })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Message.",
          });
        });
    })

}

async function chatList(req, res){
    
    Chat.find(
      // {
      //   admins: { $elemMatch: { admin_id: admins.admin_id } },
      // }
    )
    .then((data) => {
        res.send({status : true, message : "Chat List", result : data});
    }).catch((err)=>{
        res.send({message : err});
    })
}

module.exports = {
    send, chatList
}