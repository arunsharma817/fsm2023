const mongoose = require('mongoose');
const { Schema } = mongoose;


const MainProductsSchema = new Schema({
   main_products_name:{
     type: String     
   },
   main_products_description:{
        type: String
    },
   main_products_capacity:{
        type: String
    },
   main_products_manufactured_date:{
        type: Date,
        default: Date.now
    },
   main_products_due_date:{
        type: Date,
        default: Date.now
    },
   main_products_remarks:{
        type: String,
        minLength:3,
        maxLength:20
    },
   main_products_client_id:{
     type: String
    },
   main_products_info1:{
        type: String
    },
   main_products_info2:{
         type: String
     },
   main_products_info3:{
          type: String
     },
   main_products_info4:{
           type: String
     }

});

const MainProducts = mongoose.model('main_products', MainProductsSchema);


module.exports = MainProducts;
