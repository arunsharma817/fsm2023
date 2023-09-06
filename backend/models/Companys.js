const mongoose = require('mongoose');
const { Schema } = mongoose;


const CompanysSchema = new Schema({

    company_industry: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_name: {
        type: String, 
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_services: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_products: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_cmm_level: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_website: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },    
    company_hr_mail: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_company_logo: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_info_mail: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_career_mail: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_phone_number: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_mobile_number: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    company_wtsap_number: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    company_linkedin_url: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    company_facebook_url: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    company_instgram_url: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_twitter_url: {
        type: String,
        minLength: 1,
        maxLength: 2000
    },
    company_youtube_url: {
        type: String,
        minLength: 1,
        maxLength: 2000
    },    
    company_start_date: {
        type: Date,
        required: true       
    },
    company_director_name: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_director_email: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_director_mobile: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_director_phone: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true      
    },
    company_director_linkedin: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_clients: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_numberof_employees: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_office_address: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_branches_countries: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_branches_cities: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_technologies: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_investors: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_share_price: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_google_ranking: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    company_google_reviews: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },    
    company_scope: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_future_projects: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_third_parties: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_founder: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_ceo: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_ceo_linkedin: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_ceo_mobile: {
        type: String,
        minLength: 3,
        maxLength: 2000,
        required: true
    },
    company_business_model: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    company_history: {
        type: String,
        minLength: 3,
        maxLength: 2000
    }
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Companys = mongoose.model('companys', CompanysSchema);

module.exports = Companys;
