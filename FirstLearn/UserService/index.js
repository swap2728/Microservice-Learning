const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const UserRouter = require('./routers/userRouter')
const {authorize } = require('./authorisation/auth')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {env} = require('process')
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL).then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));


app.use('/user',UserRouter.router);
app.get('/' , (req,res)=>{
    res.json({status:"success"})
})

app.listen(process.env.PORT,()=>{
    console.log('server start')
})


