const mongoose = require('mongoose');
const { Schema } = mongoose;


const BuildingMembersSchema = new Schema({
    
    building_member_fname:{
        type:String,        
        minLength:3,
        maxLength:200
   },
   building_member_lname:{
        type:String,
        minLength:3,
        maxLength:200
    },
    building_member_type:{
        type:String,
        minLength:3,
        maxLength:200
    },
    building_member_mobile:{
        type:String,
        minLength:3,
        maxLength:200
    },
    building_member_mobilealternate:{
        type:String,
        minLength:3,
        maxLength:200
    },
    building_member_email:{
        type:String,
        minLength:3,
        maxLength:200
    },
    building_member_address:{
        type:String,
        minLength:3,
        maxLength:200
    }
});


const BuildingMembers = mongoose.model('building_members', BuildingMembersSchema);

module.exports = BuildingMembers;
