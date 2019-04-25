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
    stops:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Stops'
    }  
        
    

})
;

module.exports = mongoose.model('Tour', tourSchema);
