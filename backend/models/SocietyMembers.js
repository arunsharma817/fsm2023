const mongoose = require('mongoose');
const { Schema } = mongoose;


const SocietyMembersSchema = new Schema({
    
    society_member_fname:{
        type:String,        
        minLength:3,
        maxLength:200
   },
   society_member_lname:{
        type:String,
        minLength:3,
        maxLength:200
    },
    society_member_type:{
        type:String,
        minLength:3,
        maxLength:200
    },
    society_member_mobile:{
        type:String,
        minLength:3,
        maxLength:200
    },
    society_member_mobilealternate:{
        type:String,
        minLength:3,
        maxLength:200
    },
    society_member_email:{
        type:String,
        minLength:3,
        maxLength:200
    },
    society_member_address:{
        type:String,
        minLength:3,
        maxLength:200
    }
});


const SocietyMembers = mongoose.model('society_members', SocietyMembersSchema);

module.exports = SocietyMembers;
