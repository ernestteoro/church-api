const mongoose = require('mongoose')

const quartierSchema = mongoose.Schema({
    
    _id:mongoose.Schema.Types.ObjectId,
    nom:{
        type: String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    ville:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ville',
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


module.exports = mongoose.model('quartier',quartierSchema);