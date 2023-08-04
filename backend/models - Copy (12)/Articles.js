const mongoose = require('mongoose');
const { Schema } = mongoose;


const ArticlesSchema = new Schema({
    
    article_title:{
        type:String,        
        minLength:3,
        maxLength:200,
        required:true
   },
   article_description:{
        type:String,
        required:true
    },
    article_author:{
        type:String,
        required:true
    },
    article_comment:{
        type:String,       
    },
    article_created_at:{
        type:String,        
    }    
});


const Articles = mongoose.model('articles', ArticlesSchema);

module.exports = Articles;
