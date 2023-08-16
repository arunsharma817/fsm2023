const mongoose = require('mongoose');
const { Schema } = mongoose;


const CandidatesSchema = new Schema({
    candidate_name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:200,
        trim:true        
    },
    candidate_email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:100       
    },
    candidate_password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:50,
        trim:true
    },
    candidate_consultant_id:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
        trim:true  
    },
    candidate_city:{
        type:String,
        minLength:3,
        maxLength:20,
        trim:true
    },
    candidate_state:{
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
    candidate_address:{
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
    candidate_phone:{
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
    candidate_other_info:{
        type:String,
        trim:true
    },
    candidate_date:{
        type:Date,
        default:Date.now
    }
});

const Candidates = mongoose.model('candidates', CandidatesSchema);

module.exports = Candidates;
