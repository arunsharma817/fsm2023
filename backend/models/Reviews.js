const mongoose = require('mongoose');
const { Schema } = mongoose;


const ReviewsSchema = new Schema({
    review_description:{
     type: String,
     required: true,
     minLength:3,
     maxLength:200,
     trim:true     
    },
    review_owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'owners'
    },
    review_rating:{
        type: String,
        minLength:3,
        maxLength:200
    },
    review_updated_date:{
        type: Date,
        default: Date.now
    },
    review_info1:{
        type: String
    },
    review_info2:{
         type: String
    },
    review_info3:{
          type: String
    },
    review_info4:{
           type: String
    }

});

const Reviews = mongoose.model('reviews', ReviewsSchema);


module.exports = Reviews;
