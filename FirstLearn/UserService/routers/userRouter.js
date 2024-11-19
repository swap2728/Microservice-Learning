const express = require('express')
const {authorize} = require('../authorisation/auth')
const router= express.Router();
const {loginUser,register,logout,userdata} = require('../controller/userController') 
router.post('/login',loginUser).post('/register',register ).get('/logout',authorize,logout)
.get('/userdata',authorize,userdata);

exports.router=router;