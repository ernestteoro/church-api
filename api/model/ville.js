const mongoose = require('mongoose')

const villeSchema = mongoose.Schema({
    
    _id:mongoose.Schema.Types.ObjectId,
    nom:{
        type: String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    pays:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'pays',
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


module.exports = mongoose.model('ville',villeSchema);