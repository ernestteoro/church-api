const mongoose = require('mongoose')

const paysSchema = mongoose.Schema({
    
    _id:mongoose.Schema.Types.ObjectId,
    nom:{
        type: String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    created:{
        type:Date,
        require:true,
        default:Date.now()
    },
    updated:{
        type:Date,
        require:true,
        default:Date.now()
    }
});


module.exports = mongoose.model('pays',paysSchema);