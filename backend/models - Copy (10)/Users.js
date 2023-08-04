const mongoose = require('mongoose');
const { Schema } = mongoose;


const UsersSchema = new Schema({
    
    user_first_name:{
        type:String,        
        minLength:3,
        maxLength:20
   },
    user_email:{
        type:String,
        required:true
    },
    user_password:{
        type:String,
        required:true,
    }
});


const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
