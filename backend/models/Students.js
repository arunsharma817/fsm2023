const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentsSchema = new Schema({

    student_fname: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    student_lname: {
        type: String, 
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    student_father_name: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    student_mother_name: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    student_age: {
        type: String,
        maxLength: 2000
    },
    student_grade: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },    
    student_section: {
        type: String,
        minLength: 1,
        maxLength: 2000
    },
    student_age_mobile: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    student_parrent_email: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    student_parrent_mobile: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    student_gaurdian_mobile: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    student_blood_group: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    student_dob: {
        type: Date,
        required: true      
    },
    student_address: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    student_city: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    student_state: {
        type: String,
        maxLength: 300
    },
    student_country: {
        type: String,
        maxLength: 300
    },
    student_continent: {
        type: String,
        maxLength: 300
    },    
    student_admission_date: {
        type: Date,
        required: true       
    },
    student_father_occupation: {
        type: String,
        maxLength: 300
    },
    student_mother_occupation: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    student_mother_income: {
        type: String,
        maxLength: 12
    },
    student_father_income: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true      
    },
    student_photo: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    student_interests: {
        type: String,
        maxLength: 300
    },
    student_male_female: {
        type: String,
        maxLength: 300
    },
    student_class_teacher: {
        type: String,
        maxLength: 300
    },
    student_stream: {
        type: String,
        maxLength: 900
    },
    student_medium: {
        type: String,
        maxLength: 900
    },
    student_board: {
        type: String,
        maxLength: 200,
        required: true       
    },
    student_uniform: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    student_books: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    student_bag: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    student_mess: {
        type: String,
        maxLength: 300
    },    
    student_transportation: {
        type: String,
        maxLength: 300
    },
    student_foreign_tour: {
        type: String,
        maxLength: 300
    },
    student_domestic_tour: {
        type: String,
        maxLength: 300
    },
    student_annual_function: {
        type: String,
        maxLength: 300
    },
    student_hod: {
        type: String,
        maxLength: 200
    },
    student_attendance: {
        type: String,
        maxLength: 200
    },
    student_health: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true
    },
    student_achievements: {
        type: String,
        maxLength: 300
    },
    student_technical_skills: {
        type: String,
        maxLength: 200
    }
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Students = mongoose.model('students', StudentsSchema);

module.exports = Students;
