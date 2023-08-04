const mongoose = require('mongoose');
const { Schema } = mongoose;


const AdminSchema = new Schema({
   
   admin_first_name:{
        type: String
   },
   admin_middle_name:{
    type: String
    },
    admin_last_name:{
        type: String
    },
   admin_email:{
        type: String,
        required: true
    },
    admin_password:{
        type: String,
        required: true
    },    
    admin_date:{
        type: Date,
        default: Date.now
    },
    admin_info1:{
        type: String
   },
   admin_info2:{
        type: String
    },
   admin_info3:{
        type: String
    },
   admin_info4:{
        type: String,
        required: true
    },
   admin_info5:{
        type: String
    }
});


const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
