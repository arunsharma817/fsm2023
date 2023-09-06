const mongoose = require('mongoose');
const { Schema } = mongoose;


const EventsSchema = new Schema({

    event_title: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    event_date: {
        type: String, 
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    event_venue: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    event_city: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    event_organizer: {
        type: String,
        maxLength: 2000
    },
    event_organizer_address: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },    
    event_organizer_phone: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    event_organizer_mobile: {
        type: String,
        minLength: 3,
        maxLength: 2000
    },
    event_organizer_email: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    event_organizer_contact_person: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    event_chief_guest: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    event_awards_latest: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    event_awards_nominee: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    event_organizer_team_size: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    event_photographer: {
        type: String,
        minLength: 2,
        maxLength: 200,
        required: true       
    },
    event_security_agency: {
        type: String,
        maxLength: 300
    },
    event_near_police_station: {
        type: String,
        maxLength: 300
    },
    event_near_police_station_contact: {
        type: String,
        maxLength: 300
    },    
    event_start_date: {
        type: Date,
        required: true       
    },
    event_end_date: {
        type: String,
        maxLength: 300
    },
    event_caterer: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    event_caterer_mobile: {
        type: String,
        maxLength: 12
    },
    event_caterer_address: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true      
    },
    event_electrician: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    event_flower_decorater: {
        type: String,
        maxLength: 300
    },
    event_nursery_contractor: {
        type: String,
        maxLength: 300
    },
    event_music_system: {
        type: String,
        maxLength: 300
    },
    event_mentor_name: {
        type: String,
        maxLength: 900
    },
    event_marketing_agency: {
        type: String,
        maxLength: 900
    },
    event_marketing_coordinater: {
        type: String,
        maxLength: 200,
        required: true       
    },
    event_sponsor_companies: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true       
    },
    event_media_agencies: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    event_transporation_agencies: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true       
    },
    event_travel_agencies: {
        type: String,
        maxLength: 300
    },    
    event_benificieries: {
        type: String,
        maxLength: 300
    },
    event_artists: {
        type: String,
        maxLength: 300
    },
    event_celebrities: {
        type: String,
        maxLength: 300
    },
    event_agency_founder: {
        type: String,
        maxLength: 300
    },
    event_agency_ceo: {
        type: String,
        maxLength: 200
    },
    event_agency_ceo_linkedin: {
        type: String,
        maxLength: 200
    },
    event_agency_ceo_mobile: {
        type: String,
        minLength: 3,
        maxLength: 200,
        required: true
    },
    event_business_model: {
        type: String,
        maxLength: 300
    },
    event_agency_history: {
        type: String,
        maxLength: 200
    }
},
{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Events = mongoose.model('events', EventsSchema);

module.exports = Events;
