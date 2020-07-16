const mongoose = require('mongoose')

const programSchema = mongoose.Schema({
    
    _id:mongoose.Schema.Types.ObjectId,
    titre:{
        type: String,
        require:true
    },
    dateDebut:{
        type:Date,
        require:false
    },
    dateFin:{
        type:Date,
        require:false
    },
    jour:{
        type:String,
        require:false
    },
    heure:{
        type:String,
        require:true
    },
    duree:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    eglise:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'eglise',
        require:false
    },
    lieu:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'quartier',
        require:false
    },
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'event',
        require:false
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

module.exports = mongoose.model('program',programSchema);