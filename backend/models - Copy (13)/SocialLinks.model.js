const mongoose = require('mongoose');
const { Schema } = mongoose;


const socialLinksSchema = new Schema({
    social_link_title: {
        type: String,
    },
    social_link_icon: {
        type: String,
    },
    social_link_source_url:{
        type: String,
    }
},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });


const socialLinks = mongoose.model('social_links', socialLinksSchema);

module.exports = socialLinks;
