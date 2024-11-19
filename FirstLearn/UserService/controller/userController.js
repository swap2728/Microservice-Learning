const {User} = require('../model/userModel')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {env} = require('process');
exports.loginUser = async(req,res)=>{
    const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, env.JWT_SECRET, { expiresIn: '1m' });
    res.cookie('token', token).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
}

exports.register =async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = new User({ email, password });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: 'User registration failed', details: err.message });
    }
  };

  exports.logout = async(req, res) => {
    try{
        res.clearCookie('token'); // Name of the cookie to clear
        res.status(200).send('Cookie cleared');
    }
    catch(err){
        res.status(500).json({error:err});
    }
  };


  exports.userdata = async(req,res) => {
    try{
        res.json({mess : "authorisatino purpose"})
    }
    catch(err){
        res.status(500).json({error:err});
    }
  };