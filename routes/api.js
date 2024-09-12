module.exports = app => {
    const router = require("express").Router();

    const UserController = require("./../app/controllers/UserController");
    const validateAdmin = require("../app/middlewares/RegAdmin");
    const adminValidate = require("../app/middlewares/LogAdmin");

    const ChatController = require("../app/controllers/ChatController");
    const ProfileController = require("../app/controllers/ProfileController");

    router.get('/index', UserController.index);
    router.post('/create', validateAdmin, UserController.create);
    router.get('/show', UserController.verifyToken, UserController.show);
    router.post('/adminLogin', adminValidate, UserController.adminLogin);

    //Chat Routes
    router.post('/send', UserController.verifyToken, ChatController.send);
    router.get('/chats', UserController.verifyToken, ChatController.chatList);
    router.get('/search-admin', UserController.verifyToken, UserController.search);

    //Profile Update
    router.post("/upload-image", ProfileController.upload);

    app.use('/api', router);


}