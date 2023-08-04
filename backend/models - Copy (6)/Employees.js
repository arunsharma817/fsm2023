const mongoose = require('mongoose');
const { Schema } = mongoose;


const EmployeesSchema = new Schema({
    employee_name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:200,
        trim:true        
    },
    employee_email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:100       
    },
    employee_password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:50,
        trim:true
    },
    employee_consultant_id:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
        trim:true  
    },
    employee_city:{
        type:String,
        minLength:3,
        maxLength:20,
        trim:true
    },
    employee_state:{
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
    employee_address:{
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
    employee_phone:{
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
    employee_other_info:{
        type:String,
        trim:true
    },
    employee_date:{
        type:Date,
        default:Date.now
    }
});

const Employees = mongoose.model('employees', EmployeesSchema);

module.exports = Employees;
