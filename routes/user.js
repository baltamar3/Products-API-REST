'use strict'
const api= require('express').Router()
const UserController = require('../controllers/userController');

api.route("/users/auth")
    .post(UserController.authenticate)

api.route("/users/register")
    .post(UserController.saveUser)    

api.route("/users")
    .get(UserController.getAllUsers)
    

api.route("/users/:id")
    .get(UserController.getUser)    
    .delete(UserController.deleteUser)
    .put(UserController.updateUser)

module.exports=api