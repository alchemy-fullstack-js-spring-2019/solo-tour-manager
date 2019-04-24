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
    },
    stops:[{

        stop:{
            type:mongoose.Types.ObjectId,
            ref:'Stop'
        }
    }]

})
;

module.exports = mongoose.model('Tour', tourSchema);
