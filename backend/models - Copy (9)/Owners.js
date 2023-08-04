const mongoose = require('mongoose');
const { Schema } = mongoose;


const OwnersSchema = new Schema({
   owner_name:{
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
   owner_email:{
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
    owner_password:{
        type: String,
        required: true,
        minLength:8,
        maxLength:200,
        trim:true,
    },
    owner_city:{
        type: String
    },
    owner_state:{
        type: String
    },
    owner_address:{
        type: String
    },
    owner_phone:{
        type: String
    },
    owner_other_info:{
        type: String
    },
    owner_date:{
        type: Date,
        default: Date.now
    }
});

const Owners = mongoose.model('owners', OwnersSchema);

//User.createIndexes();

module.exports = Owners;
