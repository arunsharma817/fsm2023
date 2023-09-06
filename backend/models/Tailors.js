const mongoose = require('mongoose');
const { Schema } = mongoose;


const TailorsSchema = new Schema({

    tailor_name: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    tailor_lname: {
        type: String, 
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    tailor_father_name: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    tailor_mother_name: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    tailor_age: {
        type: String,
        maxLength: 2000
    },
    tailor_grade: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },    
    tailor_section: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    tailor_mobile: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    tailor_official_email: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    tailor_official_mobile: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    tailor_personal_mobile: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    tailor_blood_group: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    tailor_dob: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    tailor_address: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    tailor_city: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    tailor_state: {
        type: String,
        maxLength: 300
    },
    tailor_country: {
        type: String,
        maxLength: 300
    },
    tailor_continent: {
        type: String,
        maxLength: 300
    },    
    tailor_experience: {
        type: String,
        maxLength: 300 
    },
    tailor_rating: {
        type: String,
        maxLength: 300
    },
    tailor_reviews: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    tailor_income: {
        type: String,
        maxLength: 12
    },
    tailor_investment: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true      
    },
    tailor_shop: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    tailor_services: {
        type: String,
        maxLength: 300
    },
    tailor_male_female: {
        type: String,
        maxLength: 300
    },
    tailor_gst: {
        type: String,
        maxLength: 300
    },
    tailor_course: {
        type: String,
        maxLength: 900
    },
    tailor_branches: {
        type: String,
        maxLength: 900
    },
    tailor_material: {
        type: String,
        maxLength: 200,
        required: true       
    },
    tailor_readymade: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    tailor_contract: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    tailor_fee: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    tailor_mentor: {
        type: String,
        maxLength: 300
    },    
    tailor_delivery: {
        type: String,
        maxLength: 300
    },
    tailor_overseas: {
        type: String,
        maxLength: 300
    },
    tailor_domestic: {
        type: String,
        maxLength: 300
    },
    tailor_expenses: {
        type: String,
        maxLength: 300
    },
    tailor_vehicle: {
        type: String,
        maxLength: 200
    },
    tailor_shop_time: {
        type: String,
        maxLength: 200
    },
    tailor_shop_days: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true
    },
    tailor_awards: {
        type: String,
        maxLength: 300
    },
    tailor_designing_skills: {
        type: String,
        maxLength: 200
    }
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Tailors = mongoose.model('tailors', TailorsSchema);

module.exports = Tailors;
