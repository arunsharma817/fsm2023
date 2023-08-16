const mongoose = require('mongoose');
const { Schema } = mongoose;


const EnquirySchema = new Schema({
    
    enquiry_name:{
        type:String,        
        minLength:3,
        maxLength:20
   },
   enquiry_email:{
        type:String,
        required:true
    },
    enquiry_mobile:{
        type:String,
        required:true
    },
    enquiry_type:{
        type:String,       
    },
    enquiry_description:{
        type:String,        
    }    
});


const Enquiry = mongoose.model('enquiry', EnquirySchema);

module.exports = Enquiry;
