const mongoose = require('mongoose');
const { Schema } = mongoose;


const GautraMembersSchema = new Schema({
    
    gautra_member_fname:{
        type:String,        
        minLength:3,
        maxLength:200
   },
   gautra_member_lname:{
        type:String,
        minLength:3,
        maxLength:200
    },
    gautra_member_type:{
        type:String,
        minLength:3,
        maxLength:200
    },
    gautra_member_mobile:{
        type:String,
        minLength:3,
        maxLength:200
    },
    gautra_member_mobilealternate:{
        type:String,
        minLength:3,
        maxLength:200
    },
    gautra_member_email:{
        type:String,
        minLength:3,
        maxLength:200
    },
    gautra_member_address:{
        type:String,
        minLength:3,
        maxLength:200
    }
});


const GautraMembers = mongoose.model('gautra_members', GautraMembersSchema);

module.exports = GautraMembers;
