const mongoose = require('mongoose');
const { Schema } = mongoose;


const InspectorsSchema = new Schema({
    inspector_name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:200,
        trim:true,
        validate(value){
            if(!(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).test(value))
            {
                throw new error ("Invalid UserName");
            }
        }
    },
    inspector_email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:100,
        validate(value){
            if(!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)))
            {
             throw new error("Invalid Email Address")
            }
         }
    },
    inspector_password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:50,
        trim:true,
        validate(value){
            if(!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).test(value))
            {
                throw new error ("Password Is Not Strong")
            }
        }
    },
    inspector_consultant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'consultants'  
    },
    inspector_city:{
        type:String,
        minLength:3,
        maxLength:20,
        trim:true
    },
    inspector_state:{
        type:String,
        validate(value){
            if(!(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).test(value))
            {
                throw new error ("Invalid UserName");
            }
        },
        minLength:2,
        maxLength:20,
        trim:true
    },
    inspector_address:{
        type:String,
        validate(value){
            if(!(/^[a-zA-Z0-9\s,'-]*$/).test(value))
            {
                throw new error ("Invalid UserName");
            }
        },
        minLength:8,
        maxLength:20,
        trim:true
    },
    inspector_phone:{
        type:String,
        validate(value){
            if(!(/^[0-9]{10}$/).test(value))
            {
                throw new error ("Invalid UserName");
            }
        },
        minLength:10,
        maxLength:10,
        trim:true
    },
    inspector_other_info:{
        type:String,
        trim:true
    },
    inspector_date:{
        type:Date,
        default:Date.now
    }
});

const Inspectors = mongoose.model('inspectors', InspectorsSchema);

module.exports = Inspectors;
