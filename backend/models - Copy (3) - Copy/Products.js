const mongoose = require('mongoose');
const { Schema } = mongoose;


const ProductsSchema = new Schema({
   product_name:{
     type: String,
     required: true,
     minLength:3,
     maxLength:200,
     trim:true     
   },
   product_type:{
        type: String,        
        minLength:3,
        maxLength:200
    },
   product_capacity:{
        type: String,
        minLength:3,
        maxLength:200
    },
   product_manufactured_date:{
        type: Date,
        default: Date.now
    },
   product_due_date:{
        type: Date,
        default: Date.now
    },
   product_remarks:{
        type: String,
        minLength:3,
        maxLength:20
    },
   product_client_id:{
     type: String
    },
   product_consultant_id:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'consultants'
     },
   product_info1:{
        type: String
    },
   product_info2:{
         type: String
     },
   product_info3:{
          type: String
     },
   product_info4:{
           type: String
     }

});

const Products = mongoose.model('products', ProductsSchema);


module.exports = Products;
