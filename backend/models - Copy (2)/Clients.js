const mongoose = require('mongoose');
const { Schema } = mongoose;


const ClientsSchema = new Schema({
    
   client_company_name:{
        type: String,
        required: true,
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
   client_first_name:{
        type:String,        
        minLength:3,
        maxLength:20,
        trim:true,
        validate(value){
            if(!(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).test(value))
            {
                throw new error ("Invalid UserName");
            }
        }
   },
   client_middle_name:{
        type: String
    },
    client_last_name:{
        type:String,
        minLength:3,
        maxLength:20,
        trim:true,
        validate(value){
            if(!(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).test(value))
            {
                throw new error ("Invalid UserName");
            }
        }
    },
    client_email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)))
            {
             throw new error("Invalid Email Address")
            }
         }
    },
    client_password:{
        type:String,
        required:true,
        minLength:8,
        trim:true,
        validate(value){
            if(!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).test(value))
            {
                throw new error ("Password Is Not Strong")
            }
        }
    },
    client_consultant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'consultants'       
    },
    client_city:{
        type:String,        
        minLength:3,
        maxLength:20,
        trim:true
    },
    client_state:{
        type:String,
        validate(value){
            if(!(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).test(value))
            {
                throw new error ("Invalid UserName");
            }
        },
        minLength:2,
        trim:true
    },
    client_address:{
        type:String,
        validate(value){
            if(!(/^[a-zA-Z0-9\s,'-]*$/).test(value))
            {
                throw new error ("Invalid UserName");
            }
        },
        minLength:8,
        trim:true
    },
    client_phone:{
        type:String,
        unique:true,
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
    client_other_info:{
        type: String
    },
    client_date:{
        type: Date,
        default: Date.now
    },
    client_info1:{
        type: String
   },
   client_info2:{
        type: String,
        minLength:3,
        maxLength:20,
    },
   client_info3:{
        type: String,
        minLength:3,
        maxLength:20,
    },
   client_info4:{
        type: String,
        minLength:3,
        maxLength:20,
    },
   client_info5:{
        type: String,
        minLength:3,
        maxLength:20,
    }
});


const Clients = mongoose.model('clients', ClientsSchema);

module.exports = Clients;
