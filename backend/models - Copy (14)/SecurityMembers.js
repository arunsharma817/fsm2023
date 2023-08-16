const mongoose = require('mongoose');
const { Schema } = mongoose;


const SecurityMembersSchema = new Schema({
    
    security_member_fname:{
        type:String,        
        minLength:3,
        maxLength:200
   },
   security_member_lname:{
        type:String,
        minLength:3,
        maxLength:200
    },
    security_member_type:{
        type:String,
        minLength:3,
        maxLength:200
    },
    security_member_mobile:{
        type:String,
        minLength:3,
        maxLength:200
    },
    security_member_mobilealternate:{
        type:String,
        minLength:3,
        maxLength:200
    },
    security_member_email:{
        type:String,
        minLength:3,
        maxLength:200
    },
    security_member_address:{
        type:String,
        minLength:3,
        maxLength:200
    }
});


const SecurityMembers = mongoose.model('security_members', SecurityMembersSchema);

module.exports = SecurityMembers;
