const mongoose = require('mongoose');
const { Schema } = mongoose;


const HelpdeskSchema = new Schema({
    request_subject:{
        type:String,
        minLength:3,
        maxLength:200,
        trim:true        
    },
    request_description:{
        type:String,
        trim:true,
        minLength:3,
        maxLength:100       
    },
    request_priority:{
        type:String,
        minLength:8,
        maxLength:50,
        trim:true
    },
    request_consultant_id:{
        type:String,
        minLength:4,
        maxLength:50,
        trim:true  
    },
    request_status:{
        type:String,
        minLength:3,
        maxLength:20,
        trim:true
    },
    request_state:{
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
    request_address:{
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
    request_phone:{
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
    request_other_info:{
        type:String,
        trim:true
    },
    request_date:{
        type:Date,
        default:Date.now
    }
});

const Helpdesk = mongoose.model('helpdesk', HelpdeskSchema);

module.exports = Helpdesk;
