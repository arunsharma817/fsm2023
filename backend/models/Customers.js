const mongoose = require('mongoose');
const { Schema } = mongoose;


const CustomersSchema = new Schema({

    customer_company_name: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_industry: {
        type: String, 
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_products: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_mobile: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_mobile_alternate: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_email: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },    
    customer_website: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_company_logo: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_registered_address: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_zip_code: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_city: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_state: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    customer_country: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    customer_country_code: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    customer_continent: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    customer_customer_care: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_qr_code: {
        type: String,
        minLength: 1,
        maxLength: 2000
    },
    customer_barcode_number: {
        type: String,
        minLength: 1,
        maxLength: 2000
    },    
    customer_foundation_date: {
        type: Date,
        required: true       
    },
    customer_license_number: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_pan_number: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_gst_number: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_corporation_certificate: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true      
    },
    customer_gumasta_certificate: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_moa_certificate: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_msme_certificate: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_account_details: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_cancelled_cheque: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_number_of_employees: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_director_fname: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_director_lname: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_director_email: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_director_mobile: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    customer_director_linkedin: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },    
    customer_customer_reviews: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_customer_rating: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_facebook_url: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_instagram_url: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_linkedin_url: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_youtube_url: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_made_in_countries: {
        type: String,
        minLength: 3,
        maxLength: 2000,
        required: true
    },
    customer_attributes: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    customer_brief_history: {
        type: String,
        minLength: 3,
        maxLength: 2000
    }
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Customers = mongoose.model('customers', CustomersSchema);

module.exports = Customers;
