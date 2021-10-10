const mongoose = require('mongoose');
  
const ImageSchema = new mongoose.Schema({
    beforeImages:{
        type: String
    },

    afterImages:{
        type: String
    },

    img:{
        data: Buffer,
        contentType: String
    }
});
  
//Image is a model which has a schema ImageSchema
  
module.exports = Image;