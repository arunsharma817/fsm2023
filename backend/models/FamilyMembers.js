const mongoose = require('mongoose');
const { Schema } = mongoose;


const FamilyMembersSchema = new Schema({
    
    family_member_fname:{
        type:String,        
        minLength:3,
        maxLength:200
   },
   family_member_lname:{
        type:String,
        minLength:3,
        maxLength:200
    },
    family_member_type:{
        type:String,
        minLength:3,
        maxLength:200
    },
    family_member_mobile:{
        type:String,
        minLength:3,
        maxLength:200
    },
    family_member_mobilealternate:{
        type:String,
        minLength:3,
        maxLength:200
    },
    family_member_email:{
        type:String,
        minLength:3,
        maxLength:200
    },
    family_member_address:{
        type:String,
        minLength:3,
        maxLength:200
    }
});


const FamilyMembers = mongoose.model('family_members', FamilyMembersSchema);

module.exports = FamilyMembers;
