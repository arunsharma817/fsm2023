const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserTypeSchema = new Schema({
    
    user_type_title:{
        type:String,        
        minLength:3,
        maxLength:200
   },
   user_type_description:{
        type:String,
        minLength:3,
        maxLength:200
    },
    user_type_module_permission:{
        type:String,
        minLength:3,
        maxLength:200
    }
});


const UserType = mongoose.model('user_types', UserTypeSchema);

module.exports = UserType;
