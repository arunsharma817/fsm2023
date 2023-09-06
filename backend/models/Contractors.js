const mongoose = require('mongoose');
const { Schema } = mongoose;


const ContractorsSchema = new Schema({

    contractor_industry: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    contractor_fname: {
        type: String, 
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    contractor_lname: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    contractor_products: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    contractor_experience: {
        type: String,
        maxLength: 2000
    },
    contractor_website: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },    
    contractor_hr_mail: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    contractor_logo: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    contractor_info_mail: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    contractor_career_mail: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    contractor_phone_number: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    contractor_mobile_number: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    contractor_wtsap_number: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    contractor_linkedin_url: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    contractor_facebook_url: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    contractor_instgram_url: {
        type: String,
        maxLength: 300
    },
    contractor_twitter_url: {
        type: String,
        maxLength: 300
    },
    contractor_youtube_url: {
        type: String,
        maxLength: 300
    },    
    contractor_start_date: {
        type: Date,
        required: true       
    },
    contractor_mentor_name: {
        type: String,
        maxLength: 300
    },
    contractor_mentor_email: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    contractor_mentor_mobile: {
        type: String,
        maxLength: 12
    },
    contractor_mentor_phone: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true      
    },
    contractor_mentor_linkedin: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    contractor_clients: {
        type: String,
        maxLength: 300
    },
    contractor_team_size: {
        type: String,
        maxLength: 300
    },
    contractor_office_address: {
        type: String,
        maxLength: 300
    },
    contractor_branches_countries: {
        type: String,
        maxLength: 900
    },
    contractor_branches_cities: {
        type: String,
        maxLength: 900
    },
    contractor_technologies: {
        type: String,
        maxLength: 200,
        required: true       
    },
    contractor_investors: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    contractor_share_price: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    contractor_google_ranking: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    contractor_google_reviews: {
        type: String,
        maxLength: 300
    },    
    contractor_scope: {
        type: String,
        maxLength: 300
    },
    contractor_future_projects: {
        type: String,
        maxLength: 300
    },
    contractor_third_parties: {
        type: String,
        maxLength: 300
    },
    contractor_founder: {
        type: String,
        maxLength: 300
    },
    contractor_ceo: {
        type: String,
        maxLength: 200
    },
    contractor_ceo_linkedin: {
        type: String,
        maxLength: 200
    },
    contractor_ceo_mobile: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true
    },
    contractor_business_model: {
        type: String,
        maxLength: 300
    },
    contractor_history: {
        type: String,
        maxLength: 200
    }
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Contractors = mongoose.model('contractors', ContractorsSchema);

module.exports = Contractors;
