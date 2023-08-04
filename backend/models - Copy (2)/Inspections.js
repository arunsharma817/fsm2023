const mongoose = require('mongoose');
const { Schema } = mongoose;


const InspectionsSchema = new Schema({
   client_id:{
        type: String
   },
   product_id:{
        type: String,
        unique: true
    },
   inspection_address:{
        type: String
    },
   inspection_location:{
        type: String
    },
   checked_on_date:{
        type: Date,
        default: Date.now
    },
   htp_on_date:{
        type: Date,
        default: Date.now
    },
    refill_on_date:{
        type: Date,
        default: Date.now
    },
   refill_due_date:{
        type: Date,
        default: Date.now
    },
    inspection_remarks:{
        type: String
    },  
    consultant_id:{
        type: String
    },  
    inspector_id:{
         type: String
     }

});


const Inspections = mongoose.model('inspections', InspectionsSchema);


module.exports = Inspections;
