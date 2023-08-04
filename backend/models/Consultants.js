const mongoose = require('mongoose');
const { Schema } = mongoose;


const ConsultantsSchema = new Schema({
   consultant_name:{
        type: String,
        required: true,
        minLength:3,
        maxLength:50,
        trim:true,
        validate(value){
            if(!(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).test(value))
            {
                throw new error ("Invalid UserName");
            }
        }
   },
   consultant_email:{
        type: String,
        required: true,
        maxLength:50,
        trim:true,
        validate(value){
            if(!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)))
            {
             throw new error("Invalid Email Address")
            }
         }
    },
    consultant_password:{
        type: String,
        required: true,
        minLength:8,
        maxLength:200,
        trim:true,
    },
    consultant_city:{
        type: String
    },
    consultant_state:{
        type: String
    },
    consultant_address:{
        type: String
    },
    consultant_phone:{
        type: String
    },
    consultant_other_info:{
        type: String
    },
    consultant_date:{
        type: Date,
        default: Date.now
    }
});

const Consultants = mongoose.model('consultants', ConsultantsSchema);

//User.createIndexes();

module.exports = Consultants;
