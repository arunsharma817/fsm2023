const mongoose = require('mongoose');
const { Schema } = mongoose;


const PratyashisSchema = new Schema({

    pratyashi_yuvak_yuvati: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_vishesh_parishisht: {
        type: String, 
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_adhik_aayu: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_talakshuda: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_pura_name: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_janm_dinank: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },    
    pratyashi_janm_ghanta: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_company_logo: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_janm_minute: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_janm_ampm: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_sthan_rajya: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_sthan_zila: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    pratyashi_sthan_gaaon_shahar: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    pratyashi_gautra_swyam: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    pratyashi_gautra_nanihal: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    pratyashi_sharirik_uchai: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_sharirik_inch: {
        type: String,
        minLength: 1,
        maxLength: 2000
    },
    pratyashi_sharirik_vajan: {
        type: String,
        minLength: 1,
        maxLength: 2000
    },    
    pratyashi_sharirik_rang: {
        type: Date,
        required: true       
    },
    pratyashi_jankari_rashi: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_jankari_nakshatr: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_jankari_naadi: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_jankari_charan: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true      
    },
    pratyashi_manglik: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_shani: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_patrika_milan: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_shekshanik_yogyata: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_vyavsay: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_masik_aay: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_pita_vyavsay: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_pita_masik_aay: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_pita_naam: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_vartaman_pata: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    pratyashi_vartaman_rajya: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },    
    pratyashi_vartaman_zila: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_vartaman_gaaon_shahar: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_vartaman_pincode: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_sthayi_pata: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_sthayi_rajya: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_sthayi_zila: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_sthayi_gaaon_shahar: {
        type: String,
        minLength: 3,
        maxLength: 2000,
        required: true
    },
    pratyashi_sthayi_pin_code: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    pratyashi_photo: {
        type: String,
        minLength: 3,
        maxLength: 2000
    }
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Pratyashis = mongoose.model('pratyashis', PratyashisSchema);

module.exports = Pratyashis;
