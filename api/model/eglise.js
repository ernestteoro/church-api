const mongoose = require('mongoose')

const egliseSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    nom:{
        type: String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        require:true
    },
    logitude:{
        type:String,
        require:false
    },
    latitude:{
        type:String,
        require:false
    },
    quartier:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'quartier',
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


module.exports = mongoose.model('eglise',egliseSchema);