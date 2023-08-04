const mongoose = require('mongoose');
const { Schema } = mongoose;


const CoursesSchema = new Schema({
    
    course_title:{
        type:String,        
        minLength:3,
        maxLength:200,
        required:true
   },
   course_description:{
        type:String,
        required:true
    },
    course_author:{
        type:String,
        required:true
    },
    course_comment:{
        type:String,       
    },
    course_created_at:{
        type:String,        
    }    
});


const Courses = mongoose.model('courses', CoursesSchema);

module.exports = Courses;
