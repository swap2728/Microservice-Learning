const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    email:{type:String , required:true , unique:true},
    password : {type:String , require:true}
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  // Compare password
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

exports.User = mongoose.model('User',userSchema);