const mongoose=require('mongoose');


// const schema=mongoose.Schema;

const newSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String
});

const User=mongoose.model('User',newSchema);
module.exports=User;