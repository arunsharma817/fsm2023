const mongoose = require('mongoose');
const { Schema } = mongoose;


const ManufacturersSchema = new Schema({

    manufacturer_company_name: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_industry: {
        type: String, 
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_products: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_mobile: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_mobile_alternate: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_email: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },    
    manufacturer_website: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_company_logo: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_registered_address: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_zip_code: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_city: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_state: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    manufacturer_country: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    manufacturer_country_code: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    manufacturer_continent: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    manufacturer_customer_care: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_qr_code: {
        type: String,
        minLength: 1,
        maxLength: 2000
    },
    manufacturer_barcode_number: {
        type: String,
        minLength: 1,
        maxLength: 2000
    },    
    manufacturer_foundation_date: {
        type: Date,
        required: true       
    },
    manufacturer_license_number: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_pan_number: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_gst_number: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_corporation_certificate: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true      
    },
    manufacturer_gumasta_certificate: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_moa_certificate: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_msme_certificate: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_account_details: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_cancelled_cheque: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_number_of_employees: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_director_fname: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_director_lname: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_director_email: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_director_mobile: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    manufacturer_director_linkedin: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },    
    manufacturer_customer_reviews: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_customer_rating: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_facebook_url: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_instagram_url: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_linkedin_url: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_youtube_url: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_made_in_countries: {
        type: String,
        minLength: 3,
        maxLength: 2000,
        required: true
    },
    manufacturer_attributes: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    manufacturer_brief_history: {
        type: String,
        minLength: 3,
        maxLength: 2000
    }
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Manufacturers = mongoose.model('manufacturers', ManufacturersSchema);

module.exports = Manufacturers;
