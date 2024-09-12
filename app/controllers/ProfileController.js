const Profile = require("./../models/Profile.js");

async function upload(req, res){
    res.send({result : "Profile image successfully upload"});
}

module.exports = {
    upload
}