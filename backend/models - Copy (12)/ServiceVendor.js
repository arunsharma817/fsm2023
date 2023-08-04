const mongoose = require('mongoose');
const { Schema } = mongoose;


const ServiceVendorSchema = new Schema({
    
    service_vendor_fname:{
        type:String,        
        minLength:3,
        maxLength:200
   },
   service_vendor_lname:{
        type:String,
        minLength:3,
        maxLength:200
    },
    service_vendor_type:{
        type:String,
        minLength:3,
        maxLength:200
    },
    service_vendor_mobile:{
        type:String,
        minLength:3,
        maxLength:200
    },
    service_vendor_mobilealternate:{
        type:String,
        minLength:3,
        maxLength:200
    },
    service_vendor_email:{
        type:String,
        minLength:3,
        maxLength:200
    },
    service_vendor_address:{
        type:String,
        minLength:3,
        maxLength:200
    }
});


const ServiceVendor = mongoose.model('service_vendors', ServiceVendorSchema);

module.exports = ServiceVendor;
