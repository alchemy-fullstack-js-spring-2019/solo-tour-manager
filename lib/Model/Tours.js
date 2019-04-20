const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    activities:{
        type:[String],

    },
    date:{
        type:Date
    }
})
;

module.exports = tourSchema;
