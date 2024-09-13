const { validationResult } = require("express-validator");
const Admin = require("./../models/Admin.js");
const User = require("./../models/User.js");
const jwt = require("jsonwebtoken");
const SecretKey = "JsonWebToken";
const bcrypt = require('bcryptjs');

async function index(req, res) {
  const message = new Admin({
    message: "message1",
  });
  message
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });

}

function create(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.name = ['Name is required'];
    const alert = errors.array()
    return res.send({ 'error': alert });
  }
  Admin.find()
    .sort({ admin_id: -1 }).limit(1)
    .then((data) => {
      next_id = 1;
      if (data != '') {
        next_id = data[0].admin_id + 1;
      }
      const objData = new Admin({
        admin_id: next_id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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

async function createUser(req, res){
  const {name, email, phone_number, password} = req.body;
  if(!name || !email || !phone_number || !password) {
    res.status(400).json({message:"All field is required"});
  }
  try{
    
    const checkUser = await User.findOne({email});
    if(checkUser){
      res.status(400).send({message:"User already exists."});
    }
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    const newuser = new User({
      name,email,phone_number,password
    });
    console.log('before save');

    await newuser.save();
    res.status(201).send({status:true,message:"User created successfully.",result:newuser});
  }catch(error){
      res.status(500).send({message:error});
  }
}

function show(req, res) {
  Admin.find()
    .then((data) => {
      res.send({ status: true, message: 'List', result: data })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
}

function search(req, res)
{
  Admin.findOne({"_id": req.body.id}).then((data) => {
    res.send({result : data});
  })
}

function edit(req, res) {

}

function update(req, res) {

}

function deleterow(req, res) {

}

function adminLogin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send({ satus: false, message: 'Error', result: errors.array() });
  }
  try {
    Admin.findOne({ email: req.body.email, password: req.body.password }).then(data => {
      if (data) {
        const usertoken = jwt.sign({ userId: data.admin_id }, SecretKey, { expiresIn: "10d" });
        res.send({ satus: true, message: 'Successfully login', result: data.admin_id, token: usertoken });
      } else {
        res.send({ satus: true, message: 'Admin Not found', result: '' });
      }
    })
  } catch (err) {
    res.send({ satus: false, message: '', result: err });
  }

}

function verifyToken(req, res, next) {
  const authToken = req.headers['authorization'];
  const token = authToken && authToken.split(' ')[1];
  if (!token) {
    res.status(401).send({ error: "Unauthorize" });
  }
  try {
    const decode = jwt.verify(token, SecretKey);
    res.user = decode;
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token" });
  }

}

module.exports = {
  index, create, show, edit, update, deleterow, adminLogin, verifyToken, search, createUser
}