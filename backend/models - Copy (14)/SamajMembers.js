const mongoose = require('mongoose');
const { Schema } = mongoose;


const SamajMembersSchema = new Schema({
    
    samaj_member_fname:{
        type:String,        
        minLength:3,
        maxLength:200
   },
   samaj_member_lname:{
        type:String,
        minLength:3,
        maxLength:200
    },
    samaj_member_type:{
        type:String,
        minLength:3,
        maxLength:200
    },
    samaj_member_mobile:{
        type:String,
        minLength:3,
        maxLength:200
    },
    samaj_member_mobilealternate:{
        type:String,
        minLength:3,
        maxLength:200
    },
    samaj_member_email:{
        type:String,
        minLength:3,
        maxLength:200
    },
    samaj_member_address:{
        type:String,
        minLength:3,
        maxLength:200
    }
});


const SamajMembers = mongoose.model('samaj_members', SamajMembersSchema);

module.exports = SamajMembers;
