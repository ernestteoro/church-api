const mongoose  = require('mongoose')

const dailySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    contenu :{
        type: String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    created:{
        type:Date,
        require: true,
        default:Date.now()
    },
    updated:{
        type:Date,
        require: true,
        default:Date.now()
    }
    
});


module.exports = mongoose.model('journalier',dailySchema)