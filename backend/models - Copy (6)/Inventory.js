const mongoose = require('mongoose');
const { Schema } = mongoose;


const InventorySchema = new Schema({
    inventory_type:{
        type:String,
        minLength:3,
        maxLength:200,
        trim:true        
    },
    inventory_details:{
        type:String,
        trim:true,
        minLength:3,
        maxLength:100       
    },
    inventory_qyantity:{
        type:String,
        minLength:8,
        maxLength:50,
        trim:true
    },
    inventory_consultant_id:{
        type:String,
        minLength:4,
        maxLength:50,
        trim:true  
    },
    inventory_status:{
        type:String,
        minLength:3,
        maxLength:20,
        trim:true
    },
    inventory_state:{
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
    inventory_address:{
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
    inventory_phone:{
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
    inventory_other_info:{
        type:String,
        trim:true
    },
    inventory_date:{
        type:Date,
        default:Date.now
    }
});

const Inventory = mongoose.model('inventory', InventorySchema);

module.exports = Inventory;
