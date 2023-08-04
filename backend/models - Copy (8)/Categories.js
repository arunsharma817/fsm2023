const mongoose = require('mongoose');
const { Schema } = mongoose;


const CategoriesSchema = new Schema({
    category_name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:200,
        trim:true        
    },
    category_code:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:100       
    },
    category_description:{
        type:String,
        required:true,
        minLength:8,
        maxLength:50,
        trim:true
    },
    category_consultant_id:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
        trim:true  
    },
    category_city:{
        type:String,
        minLength:3,
        maxLength:20,
        trim:true
    },
    category_state:{
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
    category_address:{
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
    category_phone:{
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
    category_other_info:{
        type:String,
        trim:true
    },
    category_date:{
        type:Date,
        default:Date.now
    }
});

const Categories = mongoose.model('categories', CategoriesSchema);

module.exports = Categories;
